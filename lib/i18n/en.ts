// English — source of truth. The Translations interface is derived from this shape.
// All other locale files must satisfy Translations.

export interface Translations {
  common: {
    continue: string
    back: string
    preview: string
    skipForNow: string
    decideLater: string
    oneMoment: string
    saved: string
    couldntSave: string
    dragDownToPreview: string
    pullUpToKeepEditing: string
    pullDownToSeeInvitation: string
    selected: string
    uploading: string
  }
  nav: {
    steps: {
      names: string
      film: string
      style: string
      save: string
      pages: string
      details: string
      review: string
    }
    preview: string
  }
  names: {
    title: string
    lede: string
    firstPerson: string
    secondPerson: string
    placeholderA: string
    placeholderB: string
    weddingDate: string
    day: string
    month: string
    year: string
    continueWithoutDate: string
    dateNudge: string
    months: string[]
  }
  film: {
    title: string
    lede: string
    uploadLabel: string
    uploadComingSoon: string
    uploadDone: string
    uploadUploading: string
    uploadHint: string
    uploadPrice: string
    uploadingTitle: string
    processingTitle: string
    uploadingSubtitle: string
    processingSubtitle: string
    curatedNote: string
    skipLabel: string
  }
  frame: {
    title: string
    lede: string
    blendTitle: string
    blendBlurb: string
    cropTitle: string
    cropBlurb: string
    focalHint: string
  }
  style: {
    title: string
    lede: string
    sectionPalette: string
    sectionHeroLayout: string
    sectionLettering: string
    previewLabel: string
    closePreview: string
  }
  save: {
    title: string
    lede: string
    primaryLabel: string
    skipLabel: string
    emailLabel: string
    emailPlaceholder: string
    emailInvalid: string
    savedNotice: string
    secureNote: string
  }
  sections: {
    title: string
    lede: string
    items: Record<string, { label: string; blurb: string }>
  }
  details: {
    title: string
    ledeEmpty: string
    ledeFilled: string
    story: {
      captionLabel: string
      captionPlaceholder: string
      storyLabel: string
      storyPlaceholder: string
    }
    schedule: {
      presets: string[]
      eventPlaceholder: string
      locationPlaceholder: string
      notesLabel: string
      notesPlaceholder: string
      removeEvent: string
    }
    venue: {
      nameLabel: string
      namePlaceholder: string
      addressLabel: string
      addressPlaceholder: string
      gettingThereLabel: string
      gettingTherePlaceholder: string
    }
    gifts: {
      label: string
      placeholder: string
    }
    dressCode: {
      notesLabel: string
      notesPlaceholder: string
    }
    faq: {
      questionPlaceholder: string
      removeQuestion: string
    }
    gallery: {
      addPhotos: string
      removePhoto: string
      uploadError: string
      removeError: string
      fileSkipped: string
    }
    noSections: string
  }
  review: {
    title: string
    lede: string
    summaryNames: string
    summaryDate: string
    summaryVenue: string
    summaryPlan: string
    summaryPages: string
    summaryTotal: string
    previewCta: string
    payAndPublish: (price: string) => string
    calculatingPrice: string
    redirecting: string
    emailGateNotice: string
    emailPlaceholder: string
    continueToPayment: string
    continueToPaymentWithPrice: (price: string) => string
    secureNote: string
  }
  heroSection: {
    yourNames: string
    yourWeddingDay: string
  }
  invite: {
    familiesNote: string
    youAreInvited: string
  }
}

export const en: Translations = {
  common: {
    continue: 'Continue',
    back: 'Back',
    preview: 'Preview',
    skipForNow: 'Skip for now',
    decideLater: 'Decide later',
    oneMoment: 'One moment…',
    saved: 'Saved',
    couldntSave: "Couldn't save — check your connection",
    dragDownToPreview: 'Drag down to preview',
    pullUpToKeepEditing: 'Pull up to keep editing',
    pullDownToSeeInvitation: 'Pull down to see your invitation',
    selected: 'Selected',
    uploading: 'Uploading…',
  },
  nav: {
    steps: {
      names: 'Your names',
      film: 'Your film',
      style: 'Your style',
      save: 'Keep it safe',
      pages: 'Your pages',
      details: 'The details',
      review: 'Review',
    },
    preview: 'Preview',
  },
  names: {
    title: "Who's getting married?",
    lede: 'These names appear at the heart of your invitation.',
    firstPerson: 'First person',
    secondPerson: 'Second person',
    placeholderA: 'e.g. Emma',
    placeholderB: 'e.g. Luca',
    weddingDate: 'Wedding date',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    continueWithoutDate: 'Continue without a date',
    dateNudge: 'Adding your date lets guests save it and powers the countdown — or continue and add it later.',
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
  },
  film: {
    title: 'Your opening film',
    lede: 'Guests see this first. Pick a mood or upload a clip from your day.',
    uploadLabel: 'Your own clip',
    uploadComingSoon: 'Coming soon',
    uploadDone: 'Uploaded ✓',
    uploadUploading: 'Uploading…',
    uploadHint: 'Only upload videos with a maximum duration of 10 seconds in MP4 or MOV format.',
    uploadPrice: '+€4.99',
    uploadingTitle: 'Uploading your video…',
    processingTitle: 'Getting your film ready…',
    uploadingSubtitle: 'This takes 10–15 seconds. Please wait before continuing.',
    processingSubtitle: 'Your video will show in the preview. This may take a few seconds.',
    curatedNote: 'Curated films are included. Uploading your own adds €4.99.',
    skipLabel: 'Skip for now',
  },
  frame: {
    title: 'Frame your film',
    lede: 'Your film is taller or wider than some screens. Choose how it should sit behind your invitation.',
    blendTitle: 'Show it all',
    blendBlurb: 'Fits each screen — fills phones edge-to-edge, and on wider screens shows the whole film with softly blurred edges so nothing important is cut off.',
    cropTitle: 'Fill the screen',
    cropBlurb: 'Your film fills every screen edge-to-edge. Drag below to choose what stays in frame.',
    focalHint: 'Drag to choose what stays in frame',
  },
  style: {
    title: 'Set the scene',
    lede: 'Choose how your invitation opens, then dress it in a palette and lettering. Tap an opening to preview it.',
    sectionPalette: 'Palette',
    sectionHeroLayout: 'How the names open',
    sectionLettering: 'Lettering',
    previewLabel: 'Preview',
    closePreview: 'Close preview',
  },
  save: {
    title: 'Keep your work safe',
    lede: "Enter your email and we'll remind you to come back if you don't finish today.",
    primaryLabel: 'Save my email',
    skipLabel: 'Skip for now',
    emailLabel: 'Your email',
    emailPlaceholder: 'you@example.com',
    emailInvalid: 'Please enter a valid email address',
    savedNotice: "Saved! We'll email your private link the moment you publish.",
    secureNote: "If you leave without finishing, we'll send a reminder within 30 minutes.",
  },
  sections: {
    title: 'What pages do you want?',
    lede: "Add the pages you'd like — they're all included.",
    items: {
      story:     { label: 'Your story',   blurb: 'How you met, in your own words.' },
      schedule:  { label: 'The day',      blurb: 'Ceremony, dinner, dancing — when things happen.' },
      venue:     { label: 'The venue',    blurb: 'Where to be, with the address.' },
      gallery:   { label: 'Photos',       blurb: 'A few favourite pictures of you two.' },
      gifts:     { label: 'Gifts',        blurb: 'A gentle note about gifts or contributions.' },
      dress_code:{ label: 'What to wear', blurb: 'Help guests dress for the occasion.' },
      faq:       { label: 'Questions',    blurb: 'Parking, children, dietary needs — the practical bits.' },
    },
  },
  details: {
    title: 'The details',
    ledeEmpty: 'Add what you know — you can always edit before publishing.',
    ledeFilled: 'Fill in what you know — you can always edit before publishing.',
    story: {
      captionLabel: 'Caption (optional)',
      captionPlaceholder: 'e.g. From our engagement shoot in June',
      storyLabel: 'Your story',
      storyPlaceholder: 'How you met, in your own words…',
    },
    schedule: {
      presets: ['Ceremony', 'Cocktails', 'Dinner', 'Speeches', 'First Dance', 'Dancing', 'Cake Cutting', 'Send-off'],
      eventPlaceholder: 'Event name (e.g. Dinner)',
      locationPlaceholder: 'Add location',
      notesLabel: 'Other notes',
      notesPlaceholder: 'Any other timings or details…',
      removeEvent: 'Remove event',
    },
    venue: {
      nameLabel: 'Venue name',
      namePlaceholder: 'Villa Botanica',
      addressLabel: 'Address',
      addressPlaceholder: 'Full address including postcode',
      gettingThereLabel: 'Getting there',
      gettingTherePlaceholder: 'Parking, public transport, access notes…',
    },
    gifts: {
      label: 'Gift message',
      placeholder: "A note about gifts, a registry link, or 'your presence is enough'…",
    },
    dressCode: {
      notesLabel: 'Extra notes',
      notesPlaceholder: 'e.g. Comfortable shoes recommended for the outdoor ceremony',
    },
    faq: {
      questionPlaceholder: 'Question',
      removeQuestion: 'Remove question',
    },
    gallery: {
      addPhotos: 'Add photos',
      removePhoto: 'Remove photo',
      uploadError: 'A photo failed to upload — please try again.',
      removeError: 'Could not remove that photo — please try again.',
      fileSkipped: 'Some files were skipped — only images can be added.',
    },
    noSections: 'No pages selected yet — go back to choose which pages to include.',
  },
  review: {
    title: "Ready to send it?",
    lede: "Preview your invitation first, then publish when you're ready.",
    summaryNames: 'Names',
    summaryDate: 'Date',
    summaryVenue: 'Venue',
    summaryPlan: 'Plan',
    summaryPages: 'Pages',
    summaryTotal: 'Total',
    previewCta: 'Preview my invitation →',
    payAndPublish: (price) => `Pay & publish — ${price}`,
    calculatingPrice: 'Calculating price…',
    redirecting: 'Redirecting…',
    emailGateNotice: "What's your email? After payment we'll send you a private link to see who's coming.",
    emailPlaceholder: 'you@email.com',
    continueToPayment: 'Continue to payment',
    continueToPaymentWithPrice: (price) => `Continue to payment — ${price}`,
    secureNote: 'Secure payment via Stripe. Your invitation goes live the moment payment clears.',
  },
  heroSection: {
    yourNames: 'Your names',
    yourWeddingDay: 'Your wedding day',
  },
  invite: {
    familiesNote: 'You are invited to the wedding of',
    youAreInvited: 'You are invited',
  },
}
