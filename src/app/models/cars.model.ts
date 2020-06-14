
export interface Manufacturers {
    Count: number;
    Message: string;
    SearchCriteria?: string;
    Results: Manufacturer[];
}
export interface Manufacturer {
    Country: string;
    Mfr_CommonName: string;
    Mfr_ID: number;
    Mfr_Name: string;
    VehicleTypes: any[]
}

export interface Makes {
    Count: number;
    Message: string;
    SearchCriteria?: string;
    Results: Make[];
}

export interface Make {
    Make_ID: number;
    Make_Name: string;
    Mfr_Name: string;
}

export interface Models {
    Count: number;
    Message: string;
    SearchCriteria?: string;
    Results: Model[];
}

export interface Model {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}
