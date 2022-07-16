import { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import api from "../../services/api";
import { Food } from "../../components/Food";
import { FoodsContainer } from "./styles";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";

interface Ifood {
  available: false;
  description: string;
  id: string;
  image: string;
  name: string;
  price: string;
}

export function Dashboard() {
  const [foods, setFoods] = useState<Ifood[]>([]);
  const [editingFood, setEditingFood] = useState<Ifood | undefined>();
  const [modalOpen, setModalOpen] = useState(Boolean);
  const [editModalOpen, setEditModalOpen] = useState(Boolean);

  const getDatas = async () => {
    const response = await api.get("/foods");

    setFoods(response.data);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const handleAddFood = async (food: Ifood) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: Ifood) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood?.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: string) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: Ifood) => {
    setEditingFood(food);
    setModalOpen(!ModalEditFood);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
