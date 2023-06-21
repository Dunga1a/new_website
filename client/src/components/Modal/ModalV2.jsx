import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Loading from "../Loading/Loading";
import { HiXMark } from "react-icons/hi2";
import { ButtonV2 } from "../Buttons/ButtonV2";

const ModalV2 = ({
  visible = false,
  onOk,
  onCancel,
  className,
  okText = "OK",
  contentClassName,
  cancelText = "Cancel",
  children,
  centered,
  title,
  hideOkBtn,
  hideCancelBtn,
  okProps,
  loading = false,
}) => {
  const onClose = () => {
    onCancel && onCancel();
  };

  const footerClass = centered
    ? `mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense`
    : "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:gap-3";

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed z-50 inset-0 overflow-y-auto ${
          className ? className : ""
        }`}
        onClose={onClose}
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
            <div
              className={`${
                contentClassName ? contentClassName : ""
              } pg-modal-wrapper modal-wrapper inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
            >
              <div className="hidden sm:block absolute top-0 right-0 pt-5 pr-5 z-[999]">
                <button
                  type="button"
                  className="pg-modal-close-btn bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <HiXMark className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {title && (
                <div className="modal-title pb-5 text-lg font-medium">
                  {title}
                </div>
              )}
              {loading ? (
                <Loading />
              ) : (
                <div className="modal-content">{children}</div>
              )}
              {hideCancelBtn && hideOkBtn ? null : (
                <div className={`modal-footer ${footerClass}`}>
                  {!hideOkBtn && (
                    <ButtonV2
                      type="primary"
                      onClick={onOk}
                      label={okText}
                      className="w-full inline-flex justify-center sm:ml-3 sm:w-auto sm:col-start-2"
                      {...okProps}
                    ></ButtonV2>
                  )}
                  {!hideCancelBtn && (
                    <ButtonV2
                      onClick={onClose}
                      label={cancelText}
                      disabled={okProps && okProps.loading}
                      className="mt-3 w-full inline-flex justify-center sm:mt-0 sm:w-auto sm:text-sm sm:col-start-1"
                    ></ButtonV2>
                  )}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalV2;
