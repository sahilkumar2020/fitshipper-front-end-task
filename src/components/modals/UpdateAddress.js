import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useForm } from 'react-hook-form';
import { GET, DELETE, POST, PUT } from "../../services/client";
import { API_ENDPOINTS } from "../../config/constants";
import { toast } from 'react-toastify';

/**
 * Update address
 * @param {*} param0 
 * @returns 
 */
const UpdateAddress = ({
    id,
    open,
    setOpen,
}) => {
    const [addressId, setAddressId] = useState(null);
    const [showFreeForm, setFreeForm] = useState(true);
    const [data, setData] = useState(null);
    const [details, setDetails] = useState("");
    const cancelButtonRef = useRef(null);
    const [classes] = useState({
        inputCommonClass: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch
    } = useForm();

    useEffect(() => {
        reset({});
        setFreeForm(true);
        if(id) {
            setAddressId(id);
            GET(`${API_ENDPOINTS.ADDRESSES}/${id}`)
                .then(result => {
                    delete result.id;
                    const details = `${result?.name}, ${result?.address1}, ${result?.address2}, ${result?.city}, ${result?.state}, ${result?.zip}`;

                    setDetails(`${details}`);
                    Object.keys(result).forEach(key => {
                        setValue(key, result[key]);
                    })
                    setData(result);
                })
                .catch(error => toast.error(error.message));
        }
        else setAddressId(null);
    }, [open, details]);
    useEffect(() => {}, [watch("details")])

    const onSubmit = (data) => {
        if(addressId) {
            PUT(`${API_ENDPOINTS.ADDRESSES}/${addressId}`, data)
                .then(result => {
                    toast.success("Saved Successfully!");
                    setOpen(false);
                })
                .catch(error => toast.error(error.message))
        }
        else {
            POST(`${API_ENDPOINTS.ADDRESSES}`, data)
                .then(result => {
                    toast.success("Saved Successfully!");
                    setOpen(false);
                })
                .catch(error => toast.error(error.message))
        }
        
    };

    const toggleForm = () => {
        setFreeForm(status => !status);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            {addressId ? <button 
                                className="m-4 float-right text-blue-600 hover:text-blue-800 visited:text-purple-600"
                                onClick={toggleForm}
                                > Switch to {showFreeForm ? "Freeform" : "Fields"}
                            </button>: ""}

                            {showFreeForm && <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Name
                                    </label>
                                    <input
                                        {...register('name')}
                                        className={classes.inputCommonClass}
                                        id="name" type="text" placeholder="Name"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Address 1
                                    </label>
                                    <input
                                        {...register('address1')}
                                        className={classes.inputCommonClass}
                                        id="address1" type="text" placeholder="Address 1"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Address 2
                                    </label>
                                    <input
                                        {...register('address2')}
                                        className={classes.inputCommonClass}
                                        id="address2" type="text" placeholder="Address 2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        City
                                    </label>
                                    <input
                                        {...register('city')}
                                        className={classes.inputCommonClass}
                                        id="city" type="text" placeholder="City"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        State
                                    </label>
                                    <input
                                        {...register('state')}
                                        className={classes.inputCommonClass}
                                        id="state" type="text" placeholder="State"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Zip
                                    </label>
                                    <input
                                        {...register('zip')}
                                        className={classes.inputCommonClass}
                                        id="zip" type="text" placeholder="Zip"
                                    />
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>}

                            {!showFreeForm && 
                            <div className="max-w-sm rounded">
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Address (Free-form)</div>
                                    <p className="text-gray-700 text-base">{details}</p>
                                </div>
                            </div>}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default UpdateAddress;