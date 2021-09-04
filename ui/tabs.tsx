import classNames from "classnames";
import { SVGProps, useState } from "react";

type Tab = {
  name: string;
  icons: {
    active: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    inactive: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  };
  content: React.FC;
};

const Tabs: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [current, setCurrent] = useState<Tab>(tabs[0]);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          onChange={(event: React.FormEvent<HTMLSelectElement>) =>
            setCurrent(tabs[Number(event.currentTarget.value)])
          }
          defaultValue={tabs[0].name}
        >
          {tabs.map((tab, index) => (
            <option key={tab.name} value={index}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-700 mb-2">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setCurrent(tab)}
                className={classNames(
                  tab.name === current.name
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-500 group hover:text-blue-600 hover:border-blue-600",
                  "group inline-flex items-center pb-3 px-3 border-b-2 font-medium"
                )}
                aria-current={tab.name === current.name ? "page" : undefined}
              >
                {tab.name === current.name ? (
                  <tab.icons.active
                    className="text-blue-500 -ml-0.5 mr-2 h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <tab.icons.inactive
                    className="text-gray-500 -ml-0.5 mr-2 h-6 w-6 group-hover:text-blue-600"
                    aria-hidden="true"
                  />
                )}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <current.content />
    </div>
  );
};

export default Tabs;
