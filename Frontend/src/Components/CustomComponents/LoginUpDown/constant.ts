import { User } from 'lucide-react';
import { ROUTES_CONFIG } from '../../../Helper/Routes';
import { DropdownItem } from '../../../Helper/interface';

const dropdownItems: DropdownItem[] = [
  {
    icon: User,
    label: 'My ADS',
    clickHandler: (navigate) => {
      navigate(ROUTES_CONFIG.MYADS.path);
    },
  },
];

export default dropdownItems;
