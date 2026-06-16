-- ============================================================
-- reorder_sections — atomic section reorder within one invite.
-- Runs in a single transaction; the deferrable unique constraint
-- on (invite_id, position) allows temporary duplicates mid-loop.
-- ============================================================
create or replace function public.reorder_sections(
  p_invite_id   uuid,
  p_section_ids uuid[]   -- ordered: index+1 becomes the new position
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  i       int;
  v_count int;
begin
  -- Caller must own the invite or be staff
  if not exists (
    select 1 from public.invites
    where id = p_invite_id
      and (owner_id = auth.uid() or public.is_staff())
  ) then
    raise exception 'forbidden' using errcode = 'P0002';
  end if;

  -- All supplied IDs must belong to this invite
  select count(*) into v_count
  from public.invite_sections
  where invite_id = p_invite_id
    and id = any(p_section_ids);

  if v_count <> array_length(p_section_ids, 1) then
    raise exception 'section_ids_invalid' using errcode = 'P0001';
  end if;

  for i in 1..array_length(p_section_ids, 1) loop
    update public.invite_sections
    set position = i, updated_at = now()
    where id = p_section_ids[i]
      and invite_id = p_invite_id;
  end loop;
end;
$$;
