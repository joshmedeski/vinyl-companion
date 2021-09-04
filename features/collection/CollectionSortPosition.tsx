import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useOfflineDb } from "../offline-db/OfflineDbContext";
import classNames from "classnames";

const ContextualRelease: React.FC<{ index: number; isActive?: boolean }> = ({
  index,
  isActive,
}) => {
  const { collection } = useOfflineDb();
  const [release, setRelease] = useState<CollectionTypes.ReleaseInstance>();

  useEffect(() => {
    if (index < 0) return;
    if (!collection?.releases?.length) return;
    if (index < collection?.releases?.length) {
      setRelease(collection?.releases[index]);
    }
  }, [index, collection]);

  if (!release) return <React.Fragment />;

  return (
    <div
      className={classNames([
        "grid col-span-4 grid-cols-4 row-start-1 place-items-center",
        { "bg-gray-100": isActive },
      ])}
    >
      <Image
        src={release.basic_information.cover_image}
        width={500}
        height={500}
        alt="album artwork"
      />
      <div className="col-span-3 w-full p-4">
        <h3 className="font-semibold leading-none text-xl mb-1">
          {release.basic_information.artists[0].name}
        </h3>
        <p className="leading-none text-sm">
          {release.basic_information.title}
        </p>
      </div>
    </div>
  );
};

const CollectionSortPosition: React.FC<{}> = () => {
  const {
    collection,
    selectedReleaseIndex,
    setSelectedReleaseIndex,
  } = useOfflineDb();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(selectedReleaseIndex !== undefined ? true : false);
  }, [selectedReleaseIndex]);

  useEffect(() => {
    if (!open) setSelectedReleaseIndex(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const cancelButtonRef = useRef(null);

  return (
    <>
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative">
                <Dialog.Title as="h3" className="sr-only">
                  Selected Release
                </Dialog.Title>

                {selectedReleaseIndex !== undefined &&
                  !!collection?.releases.length && (
                    <div className="grid grid-cols-4 gap-4">
                      <div className="row-start-1 col-span-4">
                        <ContextualRelease index={selectedReleaseIndex - 2} />
                      </div>

                      <div className="row-start-2 col-span-4">
                        <ContextualRelease index={selectedReleaseIndex - 1} />
                      </div>

                      <div className="row-start-3 col-span-4">
                        <ContextualRelease
                          index={selectedReleaseIndex}
                          isActive
                        />
                      </div>

                      <div className="row-start-4 col-span-4">
                        <ContextualRelease index={selectedReleaseIndex + 1} />
                      </div>

                      <div className="row-start-5 col-span-4">
                        <ContextualRelease index={selectedReleaseIndex + 2} />
                      </div>
                    </div>
                  )}

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

export default CollectionSortPosition;
