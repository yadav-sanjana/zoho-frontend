export interface UserType {
    id: number;
    name: string;
    role: number;
    email: string;
    company_id: number;
    created_by: number;
    updated_by?: number;
    createdAt: string;
    updatedAt: string;
    as_company_detail: AsCompanyDetail;
    as_role: AsRole;
}
export interface AsCompanyDetail {
    id: number;
    company_name: string;
    company_address: string;
    company_city: string;
    company_country: string;
    company_zip: number;
    company_logo: string;
}
export interface AsRole {
    id: number;
    role: string;
}
export interface CustomerType {
    id: number;
    customerType: string;
    contactPerson: string;
    company: string;
    firstname: string;
    lastname: string;
    customer_email: string;
    skype_name: string;
    designation: string;
    work_phone: string;
    mobile_phone: string;
    razorpay_id?: string | null;
    stripe_id?: string | null;
    website: string;
    company_detail: number;
    created_by?: null;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
    as_company: AsCompany;
}
export interface AsCompany {
    id: number;
    company_name: string;
    company_address: string;
    company_city: string;
    company_country: string;
    company_zip: number;
    company_logo?: null;
    created_by?: null;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
}
