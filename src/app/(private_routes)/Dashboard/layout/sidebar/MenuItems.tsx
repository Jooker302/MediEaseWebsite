import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser, IconUsers
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Doctor Assigned",
    icon: IconHome,
    href: "/doctor-assigned",
  },
 
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUsers,
    href: "/users",
  },
  {
    id: uniqueId(),
    title: "Reports",
    icon: IconUsers,
    href: "/reports",
  },
];

export default Menuitems;
