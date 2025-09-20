# lego-react-table-shadcn

`lego-react-table-shadcn` is a reusable and configurable table component built with React and TypeScript. It supports features like pagination, selection, searching, and filtering with form integration.

## Features

- **Dynamic Header:** Dynamic table headers and body from API data.
- **Pagination:** Supports both client-side and server-side pagination.
- **Row Selection:** Allows selecting multiple rows with checkboxes.
- **Sorting:** Enable sorting on specified columns.
- **Search:** Built-in search functionality.
- **Custom No Data Component:** Render a custom component when there's no data.
- **Filtering:** Integrate custom filter components.
- **Fully Customizable:** Customize styles and behaviors with extensive props.

## Quick Start

Here's a simple example to get you started with Table:

```jsx
import { useState } from "react";
import "./App.css";
import AppTable from "./Component/AppTable/AppTable";
import type {
  IAppTableBody,
  InputGroup,
  InputType,
} from "./Component/AppTable/types";
import { useForm } from "react-hook-form";

function App() {
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState<IAppTableBody[]>([]);
  const selectable = { select, setSelect };
  const [search, setSearch] = useState("");

  console.log(search);

  const formUtils = useForm();

  const inputArr: InputGroup[] = [
    {
      wrapperClassName: "grid grid-cols-1 md:grid-cols-2 gap-4 items-center",
      render: [
        {
          name: "care_manager",
          filterLabel: "Care Manager",
          type: "select" as InputType,
          placeholder: "Care Manager",
          className: "w-full",
          options: [],
        },
        {
          name: "date_range",
          filterLabel: "Last call on",
          type: "date-range" as InputType,
          placeholder: "Last call on",
        },
      ],
    },
  ];

  const headers = {
    columns: {
      full_name: "Customer Name",
      phone_number: "Phone Number",
      "care_manager.full_name": "Care Manager",
      sentiment_score: "Sentiment Score",
      last_called_date: "Last Call",
      next_follow_up: "Next Follow-up",
    },
  };

  const body = {
    count: 46,
    next: "http://api-staging-linode.marzi.life/api/admin-panel/user/list/?page=2&search=",
    previous: null,
    results: [
      {
        id: 78,
        uuid: "193859ef-8d91-442a-9932-0bdec9f4ad9c",
        full_name: "Senthil R",
        phone_number: "+919500154950",
        profile_picture: null,
        care_manager: {
          id: 61,
          uuid: "c58f4e0b-929f-4b5b-bc9c-85d647eb4dd5",
          full_name: "Dhakshn",
        },
        last_called_date: "2025-09-19T06:19:58.558900",
        next_follow_up: "2025-09-21T00:00:00",
        sentiment_score: "3.5 / 5",
      },
      {
        id: 77,
        uuid: "7e74bd13-c22d-4b12-b8aa-1bed8ba9fc62",
        full_name: "Gowthaam K",
        phone_number: "+917397397605",
        profile_picture: null,
        care_manager: {
          id: 76,
          uuid: "ee6dfbbc-79e2-43d4-a7f2-6a9904ba1344",
          full_name: "Vashanth S",
        },
        last_called_date: "2025-09-18T13:09:20.663719",
        next_follow_up: "2025-09-21T00:00:00",
        sentiment_score: "2.5 / 5",
      },
      {
        id: 75,
        uuid: "07841641-0751-4cb5-aee4-7ea9d7f1444a",
        full_name: "Vishnu M",
        phone_number: "+916282327286",
        profile_picture: null,
        care_manager: null,
        last_called_date: null,
        next_follow_up: null,
        sentiment_score: "0 / 5",
      },
      {
        id: 68,
        uuid: "1af0ba0e-f3f8-4610-a689-f435a0cd3553",
        full_name: "Sharmishtha Sharma",
        phone_number: "+918587998387",
        profile_picture: null,
        care_manager: {
          id: 61,
          uuid: "c58f4e0b-929f-4b5b-bc9c-85d647eb4dd5",
          full_name: "Dhakshn",
        },
        last_called_date: "2025-09-10T10:36:38.193970",
        next_follow_up: "2025-09-13T16:47:00",
        sentiment_score: "3.0 / 5",
      },
      {
        id: 67,
        uuid: "d098f694-0b57-4551-8089-eebd488544e1",
        full_name: "ravi m",
        phone_number: "+919900889898",
        profile_picture: {
          id: 36,
          file: "https://ap-south-1.linodeobjects.com/marzi-staging/profilepicture/9862de431f494695ba0604fd119c921f.png",
        },
        care_manager: null,
        last_called_date: null,
        next_follow_up: null,
        sentiment_score: "0 / 5",
      },
      {
        id: 42,
        uuid: "469d68a4-033f-4f27-9895-1e1b97ff9848",
        full_name: "durga p",
        phone_number: "+916677889900",
        profile_picture: {
          id: 14,
          file: "https://ap-south-1.linodeobjects.com/marzi-staging/profilepicture/8e60b1dc6a9f4c67a50b182c32b21458.png",
        },
        care_manager: null,
        last_called_date: null,
        next_follow_up: null,
        sentiment_score: "0 / 5",
      },
      {
        id: 34,
        uuid: "c900a9e3-d51a-47b8-a7e7-1e9d113fba7b",
        full_name: "Shellie Chase",
        phone_number: "+917878787777",
        profile_picture: null,
        care_manager: {
          id: 40,
          uuid: "58041ece-9f1f-4599-bac8-93757a284213",
          full_name: "John Smith",
        },
        last_called_date: null,
        next_follow_up: null,
        sentiment_score: "0 / 5",
      },
      {
        id: 29,
        uuid: "ebda2925-7b5f-4ea7-a7bb-2185661b338a",
        full_name: "paru A",
        phone_number: "+918989909090",
        profile_picture: null,
        care_manager: null,
        last_called_date: null,
        next_follow_up: null,
        sentiment_score: "0 / 5",
      },
    ],
  };

  return (
    <div className="">
      <AppTable
        headers={headers?.columns}
        body={body?.results}
        total={body?.count}
        page={page}
        setPage={setPage}
        perPage={5}
        selectable={selectable}
        handleSearch={setSearch}
        checkboxClassName="data-[state=checked]:bg-[#821A52]"
        inputArr={inputArr}
        formUtils={formUtils}
        enableFilter
      />
    </div>
  );
}

export default App;
```

```js

# Data Structure

Headers

const headers = {
full_name: "Customer Name",
phone_number: "Phone Number",
"care_manager.full_name": "Care Manager",
sentiment_score: "Sentiment Score",
last_called_date: "Last Call",
next_follow_up: "Next Follow-up",
};

The key is the property in body data.

The value is the column label displayed in the table.

Body

const body = [
{
id: 78,
full_name: "Senthil R",
phone_number: "+919500154950",
care_manager: { id: 61, full_name: "Dhakshn" },
last_called_date: "2025-09-19T06:19:58.558900",
next_follow_up: "2025-09-21T00:00:00",
sentiment_score: "3.5 / 5",
},
// ...
];

Each item corresponds to a row in the table. Nested properties (like care_manager.full_name) should be defined in headers.
```

````js

#Filters

Filters are defined using the inputArr prop and powered by react-hook-form.

const inputArr: InputGroup[] = [
{
wrapperClassName: "grid grid-cols-2 gap-4",
render: [
{
name: "care_manager",
filterLabel: "Care Manager",
type: "select",
options: [{ label: "CM1", value: "cm1" }],
},
{
name: "date_range",
filterLabel: "Date Range",
type: "date-range",
},
],
},
];

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
