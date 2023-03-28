import { useFormik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { 
  createPlayer, getPlayer, 
  PlayerFormValues, updatePlayer 
} from "../../api/players";
import { Button, Spinner } from "../common";
import { LeagueDropdown, SeasonDropdown, TeamDropdown } from "../dropdowns";
import { InputError, TextInput } from "../input";
import { Form } from "../layout";
const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;

const PlayerForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["getPlayer", {}],
    async () => {
      if (id) return getPlayer(+id);
    }
  );

  // Setup initial values
  const initialValues: PlayerFormValues = {
    name: data?.name ?? "",
    playerNumber: data?.playerNumber.toString() ??  "",
    teamId: data?.teamId?.toString() ?? "",
    leagueId: data?.team?.id.toString() ?? "",
    seasonId: data?.team?.seasonId.toString() ?? "",
  };

  // Setup submit handler
  const onSubmit = async (values: PlayerFormValues) => {
    const update = async () => {
      if (!id) return;
      await updatePlayer(id, values);
      refetch();
    };
    const create = async () => {
      await createPlayer(values);
      navigate(`${adminPrefix}/players`);
    };

    setIsSubmitting(true);
    try {
      !!id ? await update() : await create();
    } catch (error) {
      alert(JSON.stringify(error))
    }
    setIsSubmitting(false);
  };

  // Setup validation
  const validate = (values: PlayerFormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.playerNumber) {
      errors.playerNumber = "Required";
    }
    if (!values.leagueId) {
      errors.leagueId = "Required";
    }
    if (!values.teamId) {
      errors.teamId = "Required";
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
        value={formik.values.name}
        onChange={formik.handleChange("name")}
        touched={formik.touched.name}
        error={formik.errors.name}
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
      <LeagueDropdown
        label="League"
        value={formik.values.leagueId}
        onChange={formik.handleChange("leagueId")}
        touched={formik.touched.leagueId}
        error={formik.errors.leagueId}
        required
        asInput
      />
      {formik.values.leagueId && <SeasonDropdown
        label="Season"
        leagueId={formik.values.leagueId}
        value={formik.values.seasonId}
        onChange={formik.handleChange("seasonId")}
        error={formik.errors.seasonId}
        touched={formik.touched.seasonId}
        requireLeague
        required
        asInput
      />}
      <TeamDropdown
        label="Team"
        leagueId={formik.values.leagueId}
        seasonId={formik.values.seasonId}
        value={formik.values.teamId}
        onChange={formik.handleChange("teamId")}
        touched={formik.touched.teamId}
        error={formik.errors.teamId}
        requireSeason
        requireLeague
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
