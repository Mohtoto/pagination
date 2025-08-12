import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import ThankyYouModal from './ThankYouModal';

interface IFormInput {
    firstName: string;
    lastName: string;
    coverLetter: string;
}

const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    coverLetter: yup.string().required('Cover letter is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

const ApplicationsModal = ({
    setModal,
    id,
    setThankModal
}: {
    setModal: (modal: boolean) => void;
    id: string;
    setThankModal: (val : boolean) => void
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        setLoading(true)
        setTimeout(() => {
            // Simulate form processing
            const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
            if (!appliedJobs.includes(id)) {
                appliedJobs.push(id);
                localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
            }

            setLoading(false);
            setModal(false);
            setThankModal(true)

            console.log("Application submitted:", data);
        }, 2000);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            toast.success('Thank you for using this app please see this!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }, [isSubmitSuccessful]);

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 transition-all">
                <ToastContainer />
                <div className="relative bg-white rounded-2xl w-full max-w-lg p-8 shadow-lg animate-fade-in">

                    {/* Close Button */}
                    <button
                        onClick={() => setModal(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Apply for this Job
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                                First Name
                            </label>
                            <input
                                {...register('firstName')}
                                id="firstName"
                                className={`w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="John"
                            />
                            {errors.firstName && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                                Last Name
                            </label>
                            <input
                                {...register('lastName')}
                                id="lastName"
                                className={`w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Doe"
                            />
                            {errors.lastName && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>

                        {/* Cover Letter */}
                        <div>
                            <label htmlFor="coverLetter" className="block text-sm font-medium mb-1">
                                Cover Letter
                            </label>
                            <textarea
                                {...register('coverLetter')}
                                id="coverLetter"
                                rows={4}
                                className={`w-full rounded-md border px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Tell us why you're a great fit..."
                            />
                            {errors.coverLetter && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.coverLetter.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white text-sm py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center"

                        >
                            {loading ? <Loader2 className='animate-spin' /> : "Submit Application"}
                        </button>

                    </form>
                </div>

            </div>
        </>
    );
};

export default ApplicationsModal;
