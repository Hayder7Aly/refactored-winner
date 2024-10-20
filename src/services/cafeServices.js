import axiosInstance from '../api/axiosInstance';

// CRUD for Cafes
export const fetchCafes = async () => {
  const { data } = await axiosInstance.get('/cafe');
  return data;
};

export const addCafe = async (cafeData) => {
  const { data } = await axiosInstance.post('/cafe', cafeData);
  return data;
};

export const updateCafe = async (cafeId, cafeData) => {
    console.log({cafeId, cafeData})
  const { data } = await axiosInstance.put(`/cafe/${cafeId}`, cafeData);
  return data;
};

export const deleteCafe = async (cafeId) => {
  await axiosInstance.delete(`/cafe/${cafeId}`);
};

// Additional API
export const fetchCafesByLocation = async (location) => {
    const { data } = await axiosInstance.get(`/cafe?location=${location}`);
    return data;
  };