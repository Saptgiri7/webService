import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {API} from '../api/config'

function getErrorMessage(error) {
  return (
    error.response?.data?.msg ||
    error.response?.data?.message ||
    error.message ||
    "Something went wrong!"
  );
}

export default function SettingsPage() {
  const [user, setUser] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    fullName: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    streetAddress: "",
    currentlyUsed: false,
  });
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const [showPopUp,setShowPopUp] = useState(null)
  const navigate = useNavigate();

  const validateAddress = (address) => {
  const errors = {};

  if (!address.fullName.trim()) errors.fullName = "Full name is required";
  if (!/^\d{10}$/.test(address.phoneNumber))
    errors.phoneNumber = "Phone number must be 10 digits";
  if (!address.country.trim()) errors.country = "Country is required";
  if (!address.state.trim()) errors.state = "State is required";
  if (!address.city.trim()) errors.city = "City is required";
  if (!address.streetAddress.trim())
    errors.streetAddress = "Street address is required";

  return errors;
};

  // ✅ Fetch user details once mounted
  useEffect(() => {
    const fetchUserFun = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Please login");

        const response = await axios.get(
          API.USER.SETTINGS,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        setErrorMessage(getErrorMessage(error))
      }
    };
    fetchUserFun();
  }, []);

  // ✅ Update editable text fields
  const handleFieldChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveField = async (field) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        API.USER.SETTINGS,
        { fieldToBeUpdated : {[field]: user[field]} },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      setShowPopUp(`${field} updated successfully`)
      setTimeout(()=>{
        setShowPopUp(null);
      },1500);
      setEditingField(null);
    } catch (error) {
      setUser()
      setErrorMessage(getErrorMessage(error))
    }
  };

  // ✅ Delete address locally (for now)
  const handleDeleteAddress = async(index) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        API.USER.SETTINGS,
        {fieldToBeUpdated : {addressToDelete : index}},
        {headers : {Authorization : `Bearer ${token}`}}
      )

      if(response.status == 200){
        setShowPopUp('Address Removed Successfully');
        setTimeout(()=>{
          setShowPopUp(null)
        },1500)
        setUser(response.data);
      }else{
        throw new Error('something went wrong');
      }
    } catch (error) {
      setUser(user)
      setErrorMessage(getErrorMessage(error));
    }
  };

  // ✅ Add new address
  const handleAddAddress = async (e) => {
      try {
            const validate = validateAddress(newAddress)

            if(Object.keys(validate).length != 0){
              throw new Error(validate);
            }

            e.preventDefault();
            const token = localStorage.getItem('token')
            const response = await axios.put(
              API.USER.SETTINGS,
              {fieldToBeUpdated : {newAddress}},
              {headers : {Authorization : `Bearer ${token}`}}
            )

            if(response.status == 200){
              setUser(response.data)
              setShowPopUp('Address added successfully');

              setTimeout(()=>{
                setShowPopUp(null)
              },1500)

              // Clear form
                setNewAddress({
                  label: "Home",
                  fullName: "",
                  phoneNumber: "",
                  country: "",
                  state: "",
                  city: "",
                  pincode: "",
                  streetAddress: "",
                  currentlyUsed: false,
                });
                setShowAddressForm(false);
            } 
            else{
              throw new Error('something went wrong');
            }
    } catch (error) {
      // setUser(user)
      setErrorMessage(getErrorMessage(error))
    }
  };

  // ✅ Password change (secured field)
  const handleChangePassword = async () => {
    if (!newPassword.trim()) return;
    if(newPassword.length < 6) {
      throw new Error('password must be atleast 6 characters long')
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        API.USER.SETTINGS,
        {fieldToBeUpdated : { password: newPassword }},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(response.status == 200){
        setShowPopUp(`Password update successfully`);
        setTimeout(()=>{
          setShowPopUp(null);
        },1500)
      }else{
        throw new Error('somethig went wrong')
      }
    } catch (error) {
      setUser(user)
      setErrorMessage(getErrorMessage(error))
    }
    setNewPassword("");
    setChangePassword(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10 transition-all duration-300">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-600 hover:text-black mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Account Settings
      </h1>

      {/* PROFILE SECTION */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-200 pb-6">
        <div className="relative flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full bg-yellow-500 text-white flex items-center justify-center text-3xl font-bold shadow">
            {user.username ? user.username.charAt(0).toUpperCase() : " "}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-gray-700">
          <EditableField
            label="Name"
            field="username"
            value={user.username}
            editingField={editingField}
            setEditingField={setEditingField}
            handleChange={handleFieldChange}
            handleSave={handleSaveField}
          />
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <EditableField
            label="Phone"
            field="phoneNumber"
            value={user.phoneNumber}
            editingField={editingField}
            setEditingField={setEditingField}
            handleChange={handleFieldChange}
            handleSave={handleSaveField}
          />
          <EditableField
            label="Country"
            field="country"
            value={user.country}
            editingField={editingField}
            setEditingField={setEditingField}
            handleChange={handleFieldChange}
            handleSave={handleSaveField}
          />

          {/* ✅ Password (secure) */}
          <div>
            <span className="font-semibold">Password:</span>{" "}
            {changePassword ? (
              <div className="inline-flex items-center gap-2">
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 outline-none"
                />
                <button
                  onClick={handleChangePassword}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setChangePassword(false)}
                  className="text-gray-500 text-sm ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setChangePassword(true)}
                className="ml-2 text-blue-500 hover:text-blue-700 text-sm"
              >
                Change
              </button>
            )}
          </div>

          <p>
            <span className="font-semibold">Last Login:</span>{" "}
            {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "—"}
          </p>

          {showPopUp && <p>
              <span className="font-semibold text-green-600">
                {showPopUp}
              </span>
            </p>}

{errorMessage && 
            <p>
              <span className="font-semibold text-red-600">
                {errorMessage}
              </span>
            </p>
          }


        </div>
      </div>

      {/* ADDRESS SECTION */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Saved Addresses
        </h2>

        <div className="space-y-3">
          {user.addresses &&
            user.addresses.map((addr, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between sm:items-center border border-gray-200 rounded-lg p-3"
              >
                <div>
                  <p className="font-medium text-gray-700">
                    {addr.label} - {addr.fullName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {addr.streetAddress}, {addr.city}, {addr.state},{" "}
                    {addr.country} - {addr.pincode}
                  </p>
                  <p className="text-gray-600 text-sm">
                    📞 {addr.phoneNumber}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteAddress(index)}
                  className="text-red-500 hover:text-red-600 mt-2 sm:mt-0"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
        </div>

        {/* ✅ Add New Address */}
        {!showAddressForm ? (
          <button
            onClick={() => setShowAddressForm(true)}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus /> Add New Address
          </button>
        ) : (
          <form
            onSubmit={handleAddAddress}
            className="mt-4 p-4 border border-gray-300 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {[
              "label",
              "fullName",
              "phoneNumber",
              "country",
              "state",
              "city",
              "pincode",
              "streetAddress",
            ].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={newAddress[field]}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, [field]: e.target.value })
                }
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            ))}

            <label className="flex items-center col-span-full">
              <input
                type="checkbox"
                checked={newAddress.currentlyUsed}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    currentlyUsed: e.target.checked,
                  })
                }
                className="mr-2"
              />
              Set as default address
            </label>

            <div className="col-span-full flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddressForm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
              >
                Save Address
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* 🧩 Reusable EditableField Component */
function EditableField({
  label,
  field,
  value,
  editingField,
  setEditingField,
  handleChange,
  handleSave,
}) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>{" "}
      {editingField === field ? (
        <span className="inline-flex items-center gap-2">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            className="border border-yellow-400 rounded px-2 py-1 outline-none"
          />
          <button
            onClick={() => handleSave(field)}
            className="text-green-600 hover:text-green-700"
          >
            <FaSave />
          </button>
        </span>
      ) : (
        <>
          {value || "—"}{" "}
          <button
            onClick={() => setEditingField(field)}
            className="text-blue-500 hover:text-blue-600 ml-2"
          >
            <FaEdit size={14} />
          </button>
        </>
      )}
    </p>
  );
}
