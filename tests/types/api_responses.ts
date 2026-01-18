export interface SignUpResponse {
  data: {
    signUp: any;
  };
  errors?: Array<{
    message: string;
    extensions: {
      errors: Array<{
        key: string;
        type: string;
        messages: string[];
      }>;
    };
  }>;
}