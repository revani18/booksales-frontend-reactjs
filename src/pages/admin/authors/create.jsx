import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createAuthor } from "../../../_services/authors";

export default function AuthorCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: name === "photo" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      await createAuthor(payload);

      alert("Author berhasil ditambahkan!");
      navigate("/admin/authors");
    } catch (error) {
      console.log("Error lengkap:", error);
      console.log("Response error:", error.response?.data);
      alert(
        error.response?.data?.message ||
        "Gagal menambahkan author. Periksa Console."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      photo: null,
      bio: "",
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">

        {/* Header */}
        <div className="p-5 border-b dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to="/admin/authors"
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Authors
            </Link>

            <span className="text-gray-400">/</span>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              Create
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add New Author
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tambahkan informasi penulis baru ke dalam koleksi buku.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="p-5 space-y-5"
        >
          {/* Author Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama penulis"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Author Photo */}
          <div>
            <label
              htmlFor="photo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author Photo
            </label>

            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
            />

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Pilih foto penulis dengan format gambar.
            </p>

            {formData.photo && (
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
                File dipilih: {formData.photo.name}
              </p>
            )}
          </div>

          {/* Author Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Biography
            </label>

            <textarea
              id="bio"
              name="bio"
              rows="5"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Masukkan biografi singkat penulis..."
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
              Save Author
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}