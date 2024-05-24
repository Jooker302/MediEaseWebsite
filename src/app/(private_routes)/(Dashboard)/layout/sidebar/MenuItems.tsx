import {
  IconBoxMultiple, IconCircleDot, IconBuildingHospital,IconHome, IconReportMedical , IconMessagePlus, IconStethoscope ,IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser, IconUsers
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
    title: "Users",
    icon: IconUsers,
    href: "/users",
  },
  {
    id: uniqueId(),
    title: "Doctors",
    icon: IconStethoscope,
    href: "/doctors",
  },
  {
    id: uniqueId(),
    title: "Reports",
    icon: IconReportMedical,
    href: "/reports",
  },
  {
    id: uniqueId(),
    title: "Chat Request",
    icon: IconMessagePlus,
    href: "/chat-request",
    
  },
];

export default Menuitems;
