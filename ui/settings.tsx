import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  AdjustmentsIcon,
  MusicNoteIcon as OutlineMusicNoteIcon,
  DatabaseIcon as OutlineDatabaseIcon,
  InformationCircleIcon as OutlineInformationCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  MusicNoteIcon as SolidMusicNoteIcon,
  DatabaseIcon as SolidDatabaseIcon,
  InformationCircleIcon as SolidInformationCircleIcon,
} from "@heroicons/react/solid";
import Tabs from "./tabs";
import DiscogsSettings from "@vc/features/discogs/DiscogsSettings";
import CollectionSettings from "@vc/features/collection/CollectionSettings";

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <button
        type="button"
        className="flex items-center text-black dark:text-white space-x-1"
        onClick={() => setOpen(true)}
      >
        <AdjustmentsIcon className="w-6 h-6 text-primary" />
        <p>Settings</p>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 dark:text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative">
                <Dialog.Title as="h3" className="sr-only">
                  Settings
                </Dialog.Title>

                <Tabs
                  tabs={[
                    {
                      name: "Discogs",
                      icons: {
                        active: SolidMusicNoteIcon,
                        inactive: OutlineMusicNoteIcon,
                      },
                      content: function DiscogsTabContent() {
                        return <DiscogsSettings />;
                      },
                    },
                    {
                      name: "Database",
                      icons: {
                        active: SolidDatabaseIcon,
                        inactive: OutlineDatabaseIcon,
                      },
                      content: function DatabaseTabContent() {
                        return <CollectionSettings />;
                      },
                    },
                    {
                      name: "Credits",
                      icons: {
                        active: SolidInformationCircleIcon,
                        inactive: OutlineInformationCircleIcon,
                      },
                      content: function CreditsTabContent() {
                        return <h1>Made by Josh Medeski</h1>;
                      },
                    },
                  ]}
                />

                <button
                  type="button"
                  className="absolute top-0 right-0"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  <XIcon className="w-12 h-12 text-gray-500 p-2" />
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Settings;
