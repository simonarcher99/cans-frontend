import { errorActions } from "./error-slice";
import { cansActions } from "./cans-slice";
import { BACKEND_URL } from "../utilities/constants";

export const fetchCanData = () => {
  return async (dispatch) => {
    const getBackendData = (BACKEND_URL) => {
      const response = await fetch(BACKEND_URL + "api/cans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("could not fetch cart data");
      }
      const data = await response.json();
    };

    try {
      const cansData = await getBackendData(BACKEND_URL);
      cansData.map((item) => dispatch(cansActions.addItem(item)));
    } catch (error) {
      dispatch(
        errorActions.addHttpError({
          message: error.message,
        })
      );
    }
  };
};
