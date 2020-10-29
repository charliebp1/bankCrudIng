export interface BankMock {
    customers:       Customer[];
    accounts:        Account[];
    customerAccount: CustomerAccount[];
    transactions:    Transaction[];
}

export interface Account {
    ID:             number;
    Alias:          string;
    IBAN:           string;
    OverallBalance: number;
    ProductType:    ProductType;
    Currency:       Currency;
}

export enum Currency {
    Empty = "€",
}

export enum ProductType {
    Payments = "Payments",
    Payroll = "Payroll",
    Savings = "Savings",
}

export interface CustomerAccount {
    UUIDCustomer: string;
    IDAccount:    number;
    HolderType:   HolderType;
}

export enum HolderType {
    AccountHolder = "Account Holder",
    SecondaryHolder = "Secondary Holder",
}

export interface Customer {
    ID:      number;
    UUID:    string;
    Name:    string;
    Surname: string;
    Address: string;
    Email:   string;
    Avatar:  string;
}

export interface Transaction {
    IDTransaction:        string;
    OrderedBy:            string;
    Amount:               number;
    IDOriginAccount:      number;
    IDDestinationAccount: number;
    ExecutionDate:        number;
    OrderDate:            number;
    Description:          string;
}
