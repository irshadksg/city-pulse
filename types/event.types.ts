export interface GetEventApiParams {
  keyword?: string;
  city?: string;
}

export interface TicketmasterEvent {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: {
    ratio?: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  }[];
  sales: {
    public: {
      startDateTime: string;
      startTBD: boolean;
      startTBA: boolean;
      endDateTime: string;
    };
  };
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
      dateTBD: boolean;
      dateTBA: boolean;
      timeTBA: boolean;
      noSpecificTime: boolean;
    };
    timezone: string;
    status: {
      code: string;
    };
    spanMultipleDays: boolean;
  };
  classifications: {
    primary: boolean;
    segment: {
      id: string;
      name: string;
    };
    genre: {
      id: string;
      name: string;
    };
    subGenre: {
      id: string;
      name: string;
    };
    type: {
      id: string;
      name: string;
    };
    subType: {
      id: string;
      name: string;
    };
    family: boolean;
  }[];
  info: string;
  pleaseNote: string;
  seatmap: {
    staticUrl: string;
    id: string;
  };
  accessibility: {
    info: string;
    ticketLimit: number;
    id: string;
  };
  ageRestrictions: {
    legalAgeEnforced: boolean;
    id: string;
  };
  ticketing: {
    safeTix: {
      enabled: boolean;
    };
    allInclusivePricing: {
      enabled: boolean;
    };
    id: string;
  };
  _links: {
    self: {
      href: string;
    };
    attractions: {
      href: string;
    }[];
    venues: {
      href: string;
    }[];
  };
}
