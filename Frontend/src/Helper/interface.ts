import { FormikErrors, FormikTouched } from 'formik';

// fiter section interface
export interface FilterProps {
  category?: string;
  response?: ResponseData;
  sampleData?: SampleData;
  setSampleData?: (arg: any) => void;
  price?: [number, number];
  setPrice?: (arg: any) => void;
}

export interface ResponseData {
  products?: Product[];
  subcategories?: { subcategory_name: string; product_count: number }[];
  Brand?: string[];
  count: number | undefined;
}

export interface SampleData {
  category?: string;
  subcategory: string;
  brand: string[];
  price: [number, number];
}

export interface Product {
  is_favourite?: boolean;
  id: number;
  name: string;
  price: React.ReactNode;
  display_photo?: string;
  category?: React.ReactNode;
  city?: React.ReactNode;
  district?: React.ReactNode;
  state?: React.ReactNode;
  images?: string;
  status?: React.ReactNode;
  subcategory?: React.ReactNode;
  user?: React.ReactNode;
  description?: React.ReactNode;
  created_at?: React.ReactNode;
}

export interface PaginationParams {
  search?: string | null;
  page?: number;
  limit?: number;
  id?: number;
  category?: string;
  userId?: string | null;
   token?: string | null;
}

// CarImages props &&  myAdsImage props
export interface ImageProps {
  data: {
    created_at?: React.ReactNode;
    id: number;
    name: string;
    price: React.ReactNode;
    display_photo?: string | null;
    category?: React.ReactNode;
    city?: React.ReactNode;
    district?: React.ReactNode;
    state?: React.ReactNode;
    status?: React.ReactNode;
    subcategory?: React.ReactNode;
    user?: React.ReactNode;
    is_favourite?: boolean;
  };
  refetch?: () => void;
  refetchDashboard?: () => void;
}

//    input field props
export interface InputFieldProps {
  compulsory?: boolean;
  label: string;
  type?: string;
  value: string | number | [] | boolean | undefined;
  htmlFor: string;
  err?: boolean;
  tch?: boolean;
  countRequired?: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    htmlFor: string,
    setFieldValue: (field: string, value: any) => void,
    label: string
  ) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setFieldValue:
    | ((
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ) => Promise<void | FormikErrors<any>>)
    | undefined;
}

// pagination props
export interface PaginationProps {
  page: number;
  totalpage: number;
  setPage: (prev: any) => any;
  showButton: { prev: boolean; next: boolean };
}

// chat message interface
export interface ChatMsgSectionProps {
  roomId?: string;
}

// Edit ads
export interface InitialValuesProps {
  title?: string;
  description?: string;
  brand?: string;
  year?: string;
  price?: string;
  photos?: File[];
  state?: string;
  city?: string;
  sellerName?: string;
  mobileNumber?: string;
}

export interface EditAdsProps {
  setEditOpen: (open: boolean) => void;
  refetch?: () => void;
  data: {
    created_at?: React.ReactNode;
    id: number;
    name: string;
    price: React.ReactNode;
    display_photo?: string | null;
    category?: React.ReactNode;
    city?: React.ReactNode;
    district?: React.ReactNode;
    state?: React.ReactNode;
    status?: React.ReactNode;
    subcategory?: React.ReactNode;
    user?: React.ReactNode;
    description?: string;
    is_favourite?: boolean;
  };
}

// Form props
export interface FormProps {
  touched: FormikTouched<{
    title?: string;
    description?: string;
    brand?: string;
    year?: string;
    price?: string;
    photos?: File[];
    state?: string;
    city?: string;
    sellerName?: string;
    mobileNumber?: string;

  }>;
  errors: any;
  values: {
    title?: string;
    description?: string;
    brand?: string;
    year?: string;
    price?: string;
    photos?: File[];
    state?: string;
    city?: string;
    sellerName?: string;
    mobileNumber?: string;
  };
  share: any;
}

// LocationMap props
export interface LocationMapProps {
  cityName: string;
  mapHeadingText: string;
}

// LoginUpDown Props
export interface LoginUpDownProps {
  setOpenProfile?: (arg0: (prev: boolean) => boolean) => void;
  profileRef?: React.RefObject<HTMLDivElement>;
}

export interface DropdownItem {
  icon: React.ElementType;
  label: string;
  clickHandler?: (arg: any) => void;
}

// ModalProps
export interface ModalProps {
  setAnswer: (answer: string) => void;
  text: string;
  setOpen: (open: boolean) => void;
  setDropdown?: (dropdown: boolean) => void;
}

// EditProfile Props
export interface EditProfileProps {
  username: string;
  phoneNumber: string;
  aboutMe: string;
  email: string;
}

// form props
export interface TextFieldProps {
  handleChange?: (e: React.ChangeEvent<any>) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  htmlFor: string;
  label: string;
  value?: string | number | boolean | [];
  type?: string;
  err: string | object | boolean | undefined;
  tch?: boolean;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<any>>;
  state?: string;
  countRequired?: boolean;
  compulsory?: boolean;
}

// photos
export interface PhotosProps {
  value: File[];
  type?: string;
  label: string;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<any>>;
}

// product detail
export interface ProductDetailProps {
  images?: string | string[];
}

// sellcategory props
export interface SellCategoryProps {
  categoryId: string;
}

// MessageProps
export interface MessageProps {
  id: string;
  text: string;
  createdAt: Date;
  user: string;
  room: string;
  senderId: string;
  receiverId: string;
  seen: boolean;
  receiverName: string;
}
