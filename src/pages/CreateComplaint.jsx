import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/api";

function CreateComplaint() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("file", image);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const imageUrl = await uploadImage();

      await api.post(
        "/complaints",
        {
          title,
          description,
          category,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Complaint Submitted Successfully!");

      setTimeout(() => {
        navigate("/my-complaints");
      }, 1000);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to Submit Complaint!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <Link to="/student-dashboard" className="back-link">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <h1>Create Complaint</h1>
        <p>Raise a new campus issue with optional proof image.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Complaint title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Classroom">Classroom</option>
            <option value="Hostel">Hostel</option>
            <option value="Library">Library</option>
            <option value="Network">Network</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            placeholder="Describe your issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            required
          ></textarea>

          <label className="upload-box">
            <ImagePlus size={22} />
            <span>{image ? image.name : "Upload proof image"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? (
              "Submitting..."
            ) : (
              <>
                Submit Complaint <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateComplaint;