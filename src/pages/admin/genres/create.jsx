import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createGenre } from "../../../_services/genres";

export default function GenreCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data yang dikirim:", formData);

      const response = await createGenre(formData);

      console.log("Response API:", response);
      alert("Genre berhasil ditambahkan!");
      navigate("/admin/genres");
    } catch (error) {
      console.log("Error lengkap:", error);
      console.log("Response error:", error.response?.data);
      console.log("Status:", error.response?.status);

      alert(
        error.response?.data?.message ||
          "Gagal menambahkan genre. Periksa Console.",
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to="/admin/genres"
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Genres
            </Link>

            <span className="text-gray-400">/</span>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              Create
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add New Genre
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tambahkan genre baru ke dalam koleksi buku.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="p-5 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Genre Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Fiction, Romance, Mystery"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi genre..."
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="reset"
              className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Reset
            </button>

            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save Genre
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
