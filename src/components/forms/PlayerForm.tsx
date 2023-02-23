import { useFormik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { createLeague, getLeague, updateLeague } from "../../api/leagues";
import { getPlayer } from "../../api/players";
import { Button, Spinner } from "../common";
import { InputError, TextInput } from "../input";
import DropdownInput from "../input/DropdownInput/DropdownInput";
import { Form } from "../layout";

interface PlayerFormValues {
  playerName: string;
  playerNumber: string;
  team: string;
  league: string;
}

const PlayerForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["getPlayer", { id }],
    async () => {
      if (id) return getPlayer(+id);
    }
  );

  // Setup initial values
  const initialValues: PlayerFormValues = data ?? {
    playerName: "",
    playerNumber: "",
    team: "",
    league: "",
  };

  // Setup submit handler
  const onSubmit = async (values: PlayerFormValues) => {};

  // Setup validation
  const validate = (values: PlayerFormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.playerName) {
      errors.playerName = "Required";
    }
    if (!values.playerNumber) {
      errors.playerNumber = "Required";
    }
    if (!values.team) {
      errors.team = "Required";
    }
    if (!values.league) {
      errors.league = "Required";
    }
    return errors;
  };

  // Setup form
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  // If fetching data for provided id, show loading
  if (id && isLoading) return <Spinner />;

  // If submitting, show loading
  if (isSubmitting) return <Spinner size="large" />;

  // If error fetching data, show error
  if (error) return <InputError error="Failed to load form" touched={true} />;

  // Otherwise show form
  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextInput
        label="Player Name"
        placeholder="Type player name..."
        value={formik.values.playerName}
        onChange={formik.handleChange("playerName")}
        touched={formik.touched.playerName}
        error={formik.errors.playerName}
        required
      />
      <TextInput
        label="Player Number"
        placeholder="Type player number..."
        value={formik.values.playerNumber}
        onChange={formik.handleChange("playerNumber")}
        touched={formik.touched.playerNumber}
        error={formik.errors.playerNumber}
        required
      />
      <DropdownInput
        options={[]}
        label="Team"
        placeholder="Select team..."
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        touched={formik.touched.team}
        error={formik.errors.team}
        required
        asInput
      />
      <DropdownInput
        options={[]}
        label="League"
        placeholder="Select league..."
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        touched={formik.touched.league}
        error={formik.errors.league}
        required
        asInput
      />
      <Button
        label={initialValues ? "Save" : "Add Player"}
        onClick={() => formik.submitForm()}
        isSubmit
      />
    </Form>
  );
};

export default PlayerForm;
