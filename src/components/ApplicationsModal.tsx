import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

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
    modal,
    setModal,
    id
}: {
    modal: boolean;
    setModal: (modal: boolean) => void;
    id: string
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);

        // Store job ID to localStorage
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
        if (!appliedJobs.includes(id)) {
            appliedJobs.push(id);
            localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
        }
        setModal(!modal)
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 transition">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
                <button
                    onClick={() => setModal(!modal)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-semibold text-center mb-6">
                    Apply for this Job
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="firstName" className="block font-medium mb-1">
                            First Name
                        </label>
                        <input
                            {...register('firstName')}
                            id="firstName"
                            className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="John"
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block font-medium mb-1">
                            Last Name
                        </label>
                        <input
                            {...register('lastName')}
                            id="lastName"
                            className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Doe"
                        />
                        {errors.lastName && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="coverLetter" className="block font-medium mb-1">
                            Cover Letter
                        </label>
                        <textarea
                            {...register('coverLetter')}
                            id="coverLetter"
                            rows={4}
                            className={`w-full border ${errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                                } rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Tell us why you're a great fit..."
                        />
                        {errors.coverLetter && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.coverLetter.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {isSubmitting ? "Applying..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplicationsModal;
