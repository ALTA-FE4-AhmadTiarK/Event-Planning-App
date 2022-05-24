import { errorMessage, pleaseLogin, successMessage } from "./alert";

import { API } from "./API";
import axios from "axios";

const fetchUser = async ({ setUsername, setUserId }) => {
  await axios
    .get(`${API}/users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setUsername(res.data.data.name);
      setUserId(res.data.data.id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const participate = ({ event_id, eventId, router }) => {
  axios
    .post(
      `${API}/event/participations`,
      { event_id: eventId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        successMessage(res);
      }
      router.reload();
    })
    .catch((err) => {
      if (err.response.data.message === "invalid or expired jwt") {
        pleaseLogin(router);
      } else {
        errorMessage(err);
      }
    });
};

const editButton = ({
  router,
  eventName,
  eventDate,
  eventLocation,
  eventDescription,
  quota,
}) => {
  const formData = new FormData();
  formData.append("name", eventName);
  formData.append("date", eventDate);
  formData.append("location", eventLocation);
  formData.append("details", eventDescription);
  formData.append("quota", quota);
  const { eventID } = router.query;
  axios
    .put(`${API}/event/${eventID}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.data.status === "success") {
        successMessage(res);
      }
    })
    .catch((err) => {
      errorMessage(err);
    });
};

export { fetchUser, participate, editButton };
