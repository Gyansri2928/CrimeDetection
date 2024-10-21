import React, { useState,useEffect } from "react";
import Loader from "./Loader";

export default function DetectCriminal() {
  const [addName, setAddName] = useState("");
  const [addID, setAddID] = useState("");
  const [addImg, setAddImg] = useState(null);
  const [removeName, setRemoveName] = useState("");
  const [removeID, setRemoveID] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);

  const [isLoaderVisible,setIsLoaderVisible] = useState(false);
  const [loaderText,setLoaderText] = useState("Please wait. Processing request...");
  const [loaderPercent,setLoaderPercent] = useState(0);

  useEffect(()=>{});

  const startCamera = async () => {
    const res = await fetch("/start-camera", { method: "POST" });
    const data = await res.json();
    if (
      data.status === "started" ||
      data.status === "already started"
    )
      setIsCameraActive(true);
    else if (data.status === "error")
      setIsCameraActive(false);
  }

  const stopCamera = async () => {
    const res = await fetch("/stop-camera", { method: "POST" });
      const data = await res.json();
      if (data.status === "stopped") setIsCameraActive(false);
  }

  const handleCameraAccess = async () => {
    if (!isCameraActive) {
      await startCamera();
    } else {
      await stopCamera();
    }
  };

  async function deleteRecord(e) {
    e.preventDefault();
    setIsLoaderVisible(true);

    if (removeName && removeID) {
        let sendData = new FormData();
        sendData.append("name",removeName);
        sendData.append("criminal_id",removeID);
      const res = await fetch("/api/remove_face",{method:"POST",body:sendData});
      const data = await res.json();
      setLoaderText(data.message);
      e.target.reset();
      setTimeout(()=>{
        setIsLoaderVisible(false);
        setLoaderText("Please wait. Processing images...");
        setLoaderPercent(0)
      },3000);
    } else return false;
  }

  async function addRecord(e) {
    e.preventDefault();
    setIsLoaderVisible(true);

    const interval = setInterval(()=>{
      setLoaderPercent((prevState)=>{
        if(prevState<100)
          return prevState+10
      });
    },2000);

    if (addName && addID && addImg) {
        let sendData = new FormData();
        for (const file of addImg) {
            sendData.append('images', file, file.name);
          }
        sendData.append('name', addName);
        sendData.append('criminal_id',addID);
      const res = await fetch("/api/add_face",{method:"POST",body:sendData});
      const data = await res.json();
      clearInterval(interval);
      setLoaderText(data.message);
      setLoaderPercent(100);
      e.target.reset();
      setTimeout(()=>{
        setIsLoaderVisible(false);
        setLoaderText("Please wait. Processing images...");
        setLoaderPercent(0)
      },3000);
    } else return false;
  }

  return (
    <div className="container mx-auto border-2 border-gray-500 rounded-md grid">
      <Loader loading={isLoaderVisible} progressText={loaderText} completionPercentage={loaderPercent} />
      <button type="button" className="justify-self-end bg-red-500 hover:bg-red-600 text-white cursor-pointer w-8 h-8 text-center rounded-md mr-1 mt-1" title="Close" onClick={(e)=>{window.location.href="/"}}>X</button>
      <h1 className="text-3xl text-center mt-5 font-mono">Criminal Recognition System</h1>
      <form
        action="/api/add_face"
        method="POST"
        enctype="multipart/form-data"
        className="flex flex-wrap items-center justify-around border rounded-md p-3 m-4"
        onSubmit={(e) => {
          addRecord(e);
        }}
      >
        <h3>Add a Person to records</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={(e) => {
            setAddName(e.target.value);
          }}
        />
        <input
          type="text"
          name="criminal_id"
          placeholder="Criminal ID"
          required
          onChange={(e) => {
            setAddID(e.target.value);
          }}
        />
        <input
          type="file"
          name="images"
          multiple
          required
          onChange={(e) => {
            setAddImg(e.target.files);
          }}
        />
        <button className="design-btn" type="submit">Add Wanted Person</button>
      </form>
      <br />
      <form
        action="/api/remove_face"
        method="POST"
        className="flex flex-wrap items-center justify-around border rounded-md p-3 m-4"
        onSubmit={(e) => {
          deleteRecord(e);
        }}
      >
        <h3>Remove a Person from records</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={(e) => {
            setRemoveName(e.target.value);
          }}
        />
        <input
          type="text"
          name="criminal_id"
          placeholder="Criminal ID"
          required
          onChange={(e) => {
            setRemoveID(e.target.value);
          }}
        />
        <button className="design-btn" type="submit">Delete Wanted Person</button>
      </form>
      <br />
      <h2 className="mx-5">Live Feed:</h2>
      <br />
      <button
          onClick={handleCameraAccess}
          className={`design-btn ${
            isCameraActive ? "bg-red-600" : "bg-blue-600"
          } text-white text-lg font-bold py-3 px-8 m-auto rounded-full hover:scale-105 transition-all duration-300 transform ease-in-out justify-self-center`}
        >
          {isCameraActive ? "Stop Camera" : "Start Camera"}
        </button>
        <br />
      {/* <img src="/api/detect_criminal" width="640" height="480" className="" /> */}

      <div
        className={`max-md:w-full max-md:h-[60vh] max-lg:w-[70%] max-lg:h-[70%] lg:w-[600px] lg:h-[480px] m-auto border-4 border-white bg-black bg-opacity-70 shadow-lg p-6 flex flex-col items-center justify-between justify-self-center rounded-lg z-20`}
        id="liveContainer"
      >
        {isCameraActive ? (
          <img
            src={`/api/detect_criminal?v=${Date.now()}`}
            alt="Live Camera"
            title="Live Camera"
            className="w-full h-full min-w-96 min-h-80 cursor-pointer"
            id="live"
          />
        ) : (
          <div
            title="Live Camera"
            className="w-full h-full min-w-96 min-h-80 cursor-pointer"
            id="live"
          ></div>
        )}        
      </div>
    </div>
  );
}
