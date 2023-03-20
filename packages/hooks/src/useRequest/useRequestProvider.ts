import { provide } from 'vue';

import { USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY } from './config';
import type { UseRequestOptions } from './types';

export default function useRequestProvider(config: UseRequestOptions<unknown,any,any>){
  provide<typeof config>(USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY, config);
}