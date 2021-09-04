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
          className="block w-full focus:ring-primary-500 focus:border-indigo-500 border-gray-300 dark:border-gray-700 rounded-md"
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
                    ? "border-primary-500 text-primary-500 dark:border-primary-300 dark:text-primary-300"
                    : "border-transparent text-gray-500 dark:text-gray-300 group hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-600 dark:hover:border-primary-400",
                  "group inline-flex items-center pb-3 px-3 border-b-2 font-medium"
                )}
                aria-current={tab.name === current.name ? "page" : undefined}
              >
                {tab.name === current.name ? (
                  <tab.icons.active
                    className="text-primary-500 dark:text-primary-300 -ml-0.5 mr-2 h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <tab.icons.inactive
                    className="text-gray-500 dark:text-gray-300 -ml-0.5 mr-2 h-6 w-6 group-hover:text-primary-600 dark:group-hover:text-primary-400"
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
