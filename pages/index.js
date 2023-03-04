import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

function Page({ countries }) {
  const [countryName, setCountryName] = useState("");
  const [data, setData] = useState(countries);

  useEffect(() => {
    async function fetchCountries() {
      const { data: fetchedCountries, error } = await supabase
        .from("countries")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.error(error);
      } else {
        setData(fetchedCountries);
      }
    }
    fetchCountries();
  }, [data]);

  async function handleSubmit(event) {
    event.preventDefault();
    const { data, error } = await supabase
      .from("countries")
      .insert({ name: countryName })
      .single();
    if (error) {
      console.error(error);
    }
    setCountryName("");
  }

  async function handleUpdate(country) {
    const newName = prompt("Enter new country name", country.name);
    if (newName && newName !== country.name) {
      const { data, error } = await supabase
        .from("countries")
        .update({ name: newName })
        .eq("id", country.id);
      if (error) {
        console.error(error);
      } else {
        setData((prevData) =>
          prevData.map((c) => (c.id === data && data[0] ? data[0] : c))
        );
      }
    }
  }

  async function handleDelete(country) {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${country.name}?`
    );
    if (confirmDelete) {
      const { data, error } = await supabase
        .from("countries")
        .delete()
        .eq("id", country.id);
      if (error) {
        console.error(error);
      } else {
        setData((prevData) => prevData.filter((c) => c.id !== country.id));
      }
    }
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="m-10">
        <input
          type="text"
          value={countryName}
          onChange={(event) => setCountryName(event.target.value)}
        />
        <button className="m-2" type="submit">
          Add Country
        </button>
      </form>
      <ul>
        <div className="h-[10vh] w-[100%]  flex flex-wrap  justify-center items-center">
          {data.map((country) => (
            <li
              key={country.id}
              className="bg-white text-zinc-900 w-[100%] flex flex-row flex-wrap p-10 rounded-lg m-1"
            >
              <div className=" text-zinc-900 w-[40%]"> {country.name}</div>
              <div className=" text-zinc-900 w-[60%]">
                {" "}
                <button
                  className="m-2 bg-green-400 text-black"
                  onClick={() => handleUpdate(country)}
                >
                  Update
                </button>
                <button
                  className="m-2 bg-red-400"
                  onClick={() => handleDelete(country)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .order("id", { ascending: false });
  return {
    props: {
      countries: data,
    },
  };
}

export default Page;
