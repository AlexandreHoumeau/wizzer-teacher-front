import React, { useEffect, useState } from "react";
import { ExerciceIcon } from "assets/icons";
import { Button, Input, Select } from "components/ui";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router";
import api from "services/api";

const difficulties = [
  { value: "easy", title: "Facile" },
  { value: "medium", title: "Moyen" },
  { value: "hard", title: "Difficile" },
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const arrayPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const NewCourse = () => {
  const history = useHistory();
  const [exo, setExo] = useState("");
  const [course, setCourse] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [points, setPoints] = useState("");
  const [title, setTitle] = useState("");
  const [moduleID, setModuleID] = useState(null);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    setModuleID(path[path.length - 2]);
  }, []);

  const submit = async () => {
    const data = await api.axios.post("/v1/exercices", {
      title,
      exercice: exo,
      difficulty,
      course,
      moduleID,
      points,
    });
    if (data?.$success) {
      history.goBack();
    }
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div className="font-raleway font-bold text-3xl">Créer un cours</div>
      </div>

      <div>
        <div className="text-2xl font-bold mb-4">
          Les informations sur le cours
        </div>
        <div className="bg-grey-light rounded-2xl p-8">
          <div className="grid grid-cols-8 space-x-8">
            <div className="col-span-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Titre du cours"
                placeholder="Titre"
              />
            </div>
            <div className="col-span-2">
              <Select
                action={(value) => setPoints(value)}
                value={points}
                label="Points de l'exercice"
                values={arrayPoints}
                placeholder="Points"
              />
            </div>
            <div className="col-span-2">
              <Select
                action={(value) => setDifficulty(value)}
                value={difficulty}
                label="Difficulté"
                values={difficulties}
                placeholder="Type de difficulté"
              />
            </div>
          </div>
        </div>

        <div className="text-2xl font-bold mt-8 mb-4">Le cours</div>
        <div className="bg-grey-light rounded-2xl p-8">
          <div className="grid grid-cols-12 space-x-8">
            <div className=" flex justify-center col-span-1 ">
              <div className="bg-primary-light  rounded-lg p-2">
                <ExerciceIcon />
              </div>
            </div>
            <div className="col-span-11">
              <Input
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                label="Lien du cours"
                placeholder="Lien"
              />
            </div>
          </div>
        </div>

        <div className="text-2xl mt-8 font-bold mb-4">L'exercice</div>
        <div className="bg-grey-light rounded-2xl p-8">
          <ReactQuill
            value={exo}
            modules={modules}
            className="bg-white rounded-2xl"
            onChange={setExo}
          />
        </div>

        <div className="flex justify-center mt-10">
          <Button
            action={submit}
            disabled={!exo || !course || !difficulty || !title}
            text="Enregistrer le cours"
            type="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
