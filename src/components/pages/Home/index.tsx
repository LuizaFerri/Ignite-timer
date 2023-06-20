import { useForm } from "react-hook-form";
import player from "../../../assets/player.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  TaskInput,
  MinutesAmountInput,
  StartCountdownButton,
} from "./styles";

const newCircleFormValidationSchema = zod.object({
  task: zod.string().nonempty("Por favor, insira uma tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O tempo mínimo é de 5 minutos")
    .max(60, "O tempo máximo é de 60 minutos"),
});

type NewCircleFormData = zod.infer<typeof newCircleFormValidationSchema>; //define o tipo de dados que o form vai receber através do zod

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCircleFormData>({
    resolver: zodResolver(newCircleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCircleFormData) {
    console.log(data);
    reset();
  }

  const task = watch("task"); //observa o input task e retorna o valor dele
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="dê um nome para o seu projeto"
            list="task-suggestions"
            {...register("task")}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton disabled={isSubmitDisabled}>
          {" "}
          <img src={player} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
