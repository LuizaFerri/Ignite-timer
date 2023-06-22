import player from "../../../assets/player.svg";
import handPalm from "../../../assets/handPalm.svg";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { CiclesContext } from "../../../contexts/CyclesContext";

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CiclesContext);
  const newCircleFormValidationSchema = zod.object({
    task: zod.string().nonempty("Por favor, insira uma tarefa"),
    minutesAmount: zod
      .number()
      .min(5, "O tempo mínimo é de 5 minutos")
      .max(60, "O tempo máximo é de 60 minutos"),
  });

  type NewCircleFormData = zod.infer<typeof newCircleFormValidationSchema>;
  const newCycleForm = useForm<NewCircleFormData>({
    resolver: zodResolver(newCircleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            {" "}
            <img src={handPalm} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            {" "}
            <img src={player} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
