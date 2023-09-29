import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'admin/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    routeLink: 'admin/onboarding',
    icon: 'handshake',
    label: 'Onboarding',
    items: [
      {
        routeLink: 'admin/onboarding/retailer-list',
        label: 'Retailer Listing',
      },
      {
        routeLink: 'admin/onboarding/retailer-add',
        label: 'Add Retailer',
      },
    ],
  },
  {
    routeLink: 'admin/category',
    icon: 'package_2',
    label: 'Product & Category',
    items: [
      {
        routeLink: 'admin/product/list',
        label: 'Product Listing'
      },
      {
        routeLink: 'admin/product/add',
        label: 'Add Product'
      },
      {
        routeLink: 'admin/category/list',
        label: 'Category Listing'
      },
      {
        routeLink: 'admin/category/add',
        label: 'Add Category'
      },
    ]
  },
  {
    routeLink: 'admin/inventory',
    icon: 'inventory_2',
    label: 'Inventory',
    items: [
      {
        routeLink: 'admin/inventory/purchase-order/list',
        label: 'Purchase Order List',
      },
      {
        routeLink: 'admin/inventory/purchase-order/add',
        label: 'Add Purchase Order',
      },
      {
        routeLink: 'admin/inventory/business/list',
        label: 'Business Inventory',
      },
      {
        routeLink: 'admin/inventory/retailer-wise/list',
        label: 'Retailer Inventory',
      },
      {
        routeLink: 'admin/inventory/retailer-request/list',
        label: 'Retailer Request List',
      },
      {
        routeLink: 'admin/inventory/stock-inward/list',
        label: 'Stock Inward List',
      },
      {
        routeLink: 'admin/inventory/stock-outward/list',
        label: 'Stock Outward List',
      }
    ]
  },
  {
    routeLink: 'admin/um',
    icon: 'group',
    label: 'User management',
    items: [
      {
        routeLink: 'admin/um/user-list',
        label: 'User Listing',
      },
      {
        routeLink: 'admin/um/user-add',
        label: 'Add User',
      },
      {
        routeLink: 'admin/um/role-list',
        label: 'Role Listing',
      },
      {
        routeLink: 'admin/um/role-add',
        label: 'Add Role',
      },
    ]
  },
  {
    routeLink: 'admin/order-management',
    icon: 'list_alt',
    label: 'Order management',
    items: [
      {
        routeLink: "admin/order-management/list",
        label: "Order Listing"
      },
      // {
      //   routeLink: "",
      //   label: ""
      // }
    ]
  },
  {
    routeLink: 'admin/transaction',
    icon: 'currency_rupee',
    label: 'Transaction',
  },
  {
    routeLink: 'admin/master',
    icon: 'table_chart',
    label: 'Master tables',
    items: [
      {
        routeLink: 'admin/master/manufacturer-list',
        label: 'Manufacturer Listing'
      },
      {
        routeLink: 'admin/master/manufacturer-add',
        label: 'Add Manufacturer'
      },
      {
        routeLink: 'admin/master/list',
        label: 'Intergration Settings'
      },
      {
        routeLink: 'admin/master/template-list',
        label: "Template Listing"
      },
      {
        routeLink: 'admin/master/uom-list',
        label: "UOM Listing"
      },
      {
        routeLink: 'admin/master/uom-add',
        label: "Add UOM"
      },
    ]
  },
];

export const sideBarRetailer: INavbarData[] = [
    {
      routeLink: 'retailer/dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
    },
    {
      routeLink: 'retailer/sub-retailer-onboarding',
      icon: 'handshake',
      label: 'Onboarding',
      items: [
        {
          routeLink: 'retailer/sub-retailer-onboarding/list',
          label: 'Sub-Retailer Listing',
        },
        {
          routeLink: 'retailer/sub-retailer-onboarding/add',
          label: 'Add Sub-Retailer',
        },
      ],
    },
    {
      routeLink: 'retailer/um',
      icon: 'group',
      label: 'User Management',
      items: [
        {routeLink: 'retailer/um/list', label: 'User Listing'},
        {routeLink: 'retailer/um/add', label: 'Add User'},
        {routeLink: 'retailer/um/role-list', label: 'Role Listing'},
        {routeLink: 'retailer/um/role-add', label: 'Add Role'}
      ]
    },
    {
      routeLink: "request-admin/list",
      icon: 'inventory_2',
      label: 'Inventory',
      items: [
        {
          routeLink: 'retailer/inventory/business-inventory/list',
          label: 'Business Inventory'
        },
        {
          routeLink: 'retailer/inventory/inward-stock/list',
          label: 'Inward Stock List'
        },
        {
          routeLink: 'retailer/inventory/recieved-request/list',
          label: 'Recieved Request List',
        },
        {
          routeLink: 'retailer/inventory/request-admin/list',
          label: 'Send Requests List',
        },
        {
          routeLink:'retailer/inventory/request-admin/add',
          label: 'Add Request'
        }
      ]
    },
    {
      routeLink: 'retailer/order-management',
      icon: 'list_alt',
      label: 'Order Management',
      items: [
        {routeLink: 'retailer/order-management/list', label: 'Order Listing'},
      ]
    }

]
