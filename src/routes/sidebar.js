/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import UsersGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import FolderOpenIcon from '@heroicons/react/24/outline/FolderOpenIcon'
import FolderPlusIcon from '@heroicons/react/24/outline/FolderPlusIcon'
import LifebuoyIcon from '@heroicons/react/24/outline/LifebuoyIcon'
import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '', //no url needed as this has submenu
    icon: <UsersIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Customer Management', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/customers', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Customers', // name that appear in Sidebar
      },
      {
        path: '/app/customercategories',
        icon: <UsersGroupIcon className={submenuIconClasses}/>,
        name: 'Customer Categories',
      },
      {
        path: '/app/billsources', // url
        icon: <WalletIcon className={submenuIconClasses}/>, // icon component
        name: 'Billing Sources', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <FolderOpenIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Policy Management', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'All Policies', // name that appear in Sidebar
      },
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Active Policies', // name that appear in Sidebar
      },
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Pending Policies', // name that appear in Sidebar
      },
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Settled Policies', // name that appear in Sidebar
      },
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Rejected Policies', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <FolderPlusIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Policy Administration', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Policy Products',
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Product Plans', // name that appear in Sidebar
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Policy Requests', // name that appear in Sidebar
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Policy Allocation', // name that appear in Sidebar
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Manage Premium Allocations', // name that appear in Sidebar
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'View Boudreaux', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <LifebuoyIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Claims Management', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'All Claims', // name that appear in Sidebar
      },
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Approved Claims',
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Pending Claims', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '/app/transactions', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Billing Cycle List', // name that appear in Sidebar
  },
  {
    path: '/app/charts', // url
    icon: <ChartBarIcon className={iconClasses}/>, // icon component
    name: 'Reports', // name that appear in Sidebar
  },
  {
    path: '/app/transactions', // url
    icon: <ComputerDesktopIcon className={iconClasses}/>, // icon component
    name: 'House keeping', // name that appear in Sidebar
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Profile', // name that appear in Sidebar
      },
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Users',
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'User Roles', // name that appear in Sidebar
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'System Configuration', // name that appear in Sidebar
      },
    ]
  },
  
]

export default routes


