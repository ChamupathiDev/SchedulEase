import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ModuleForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    let existingModules = JSON.parse(localStorage.getItem('modules')) || [];
    existingModules.push(data);
    localStorage.setItem('modules', JSON.stringify(existingModules));
    navigate('/modules');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-white shadow-md p-8 rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Add Module</h2>

      {/* Module Name */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">Module Name</label>
        <input
          type="text"
          {...register("moduleName", {
            required: "Module Name is required",
            minLength: { value: 3, message: "At least 3 characters" },
          })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.moduleName && <p className="text-red-500 text-sm mt-1">{errors.moduleName.message}</p>}
      </div>

      {/* Module ID */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">Module ID</label>
        <input
          type="text"
          {...register("moduleId", {
            required: "Module ID is required",
            pattern: { value: /^[A-Z]{3}\d{3}$/, message: "Format: ABC123" },
          })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.moduleId && <p className="text-red-500 text-sm mt-1">{errors.moduleId.message}</p>}
      </div>

      {/* No. of Module Credits */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">No. of Module Credits</label>
        <input
          type="number"
          {...register("moduleCredits", {
            required: "Credits are required",
            min: { value: 1, message: "Min: 1" },
            max: { value: 10, message: "Max: 10" },
          })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.moduleCredits && <p className="text-red-500 text-sm mt-1">{errors.moduleCredits.message}</p>}
      </div>

      {/* LIC Name */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">LIC Name</label>
        <input
          type="text"
          {...register("licName", {
            required: "LIC Name is required",
            pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" },
          })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.licName && <p className="text-red-500 text-sm mt-1">{errors.licName.message}</p>}
      </div>

      {/* LIC Email */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">LIC Email</label>
        <input
          type="email"
          {...register("licEmail", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
          })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.licEmail && <p className="text-red-500 text-sm mt-1">{errors.licEmail.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add Module
      </button>
    </form>
  );
};

export default ModuleForm;
