import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Input from "../Input";
import { Modal } from "../Modal";
import { FormHandles } from "@unform/core";

interface Ifood {
  available: false;
  description: string;
  id: number;
  image: string;
  name: string;
  price: string;
}

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Ifood) => void;
}

export const ModalAddFood = (props: ModalAddFoodProps) => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = async (data: any) => {
    const { setIsOpen, handleAddFood } = props;

    handleAddFood(data);
    setIsOpen();
  };

  const { isOpen, setIsOpen } = props;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

