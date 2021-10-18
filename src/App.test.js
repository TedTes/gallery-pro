import App from "./App";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";

import axios from "axios";

jest.mock("axios");

const fakeImages = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
];
const fakeFavorites = [];

beforeEach(() => {
  axios.get.mockResolvedValue({ data: fakeImages });
  render(<App />);
});
afterEach(cleanup);

describe("to test clicking image or favorite icon", () => {
  test("it should render list of images", async () => {
    const imageList = await waitFor(() => screen.getByTestId("image-list"));
    const imageItem = await waitFor(() => screen.findAllByTestId("image-item"));

    expect(imageList).toBeInTheDocument();
    expect(imageItem).toHaveLength(2);
  });

  test("favorite icon should change to red  on clicking an image", async () => {
    const imageItem = await waitFor(() => screen.getByTestId(1));
    const svgIcon = await waitFor(() => screen.getByTestId("1s"));
    fireEvent.click(imageItem);
    expect(localStorage.getItem(1)).toBe("true");
    expect(svgIcon.getAttribute("fill")).toBe("red");
  });
});
