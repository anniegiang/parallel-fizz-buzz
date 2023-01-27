import {BASE_API} from "../configs/api";

export const computeFizzBuzz = (input: string): Promise<string[]> =>
  fetch(`${BASE_API}/fizz-buzz/compute?input=${input}`)
    .then((res) => res.json())
    .then((data) => data.result)
    .then((result) => JSON.parse(result));
