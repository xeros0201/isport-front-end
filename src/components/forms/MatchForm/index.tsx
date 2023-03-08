import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  createMatch,
  getMatch,
  MatchFormValues,
  updateMatch,
} from "../../../api/matches";
import { Button, Spinner } from "../../common";
import { LeagueDropdown } from "../../dropdowns";
import LocationDropdown from "../../dropdowns/LocationDropdown";
import RoundDropdown from "../../dropdowns/RoundDropdown";
import SeasonDropdown from "../../dropdowns/SeasonDropdown";
import TeamDropdown from "../../dropdowns/TeamDropdown";
import { DateInput, DropdownInput, InputError, TextInput } from "../../input";
import FileInput from "../../input/FileInput/FileInput";
import ImageInput from "../../input/ImageInput/ImageInput";
import TimeInput from "../../input/TimeInput/TimeInput";
import { Form, Row } from "../../layout";
import CSVPreview from "./components/CSVPreview";
import TeamNameDropdown from "./components/CSVDropdown";
import "./MatchForm.scss";
import MatchTypeDropdown from "../../dropdowns/MatchTypeDropdown";
import { getSeasons } from "../../../api/seasons";

const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;
const defaultDate = new Date().toISOString();

const MatchForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [teamCSVData, setTeamCSVData] = useState<{
    homeTeamCsv?: CSVRow[];
    awayTeamCsv?: CSVRow[];
  }>({});

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["getMatch", { id }],
    async () => {
      if (id) return getMatch(+id);
    }
  );

  const { data: seasons } = useQuery(["getSeasons"], async () => getSeasons());

  // Setup initial values
  const initialValues: MatchFormValues = {
    homeTeamCsv: data?.awayTeamCsv ?? "",
    awayTeamCsv: data?.awayTeamCsv ?? "",
    seasonId: "",
    homeTeamId: data?.homeTeamId.toString() ?? "",
    awayTeamId: data?.awayTeamId.toString() ?? "",
    round: data?.round.toString() ?? "",
    type: data?.type ?? "",
    locationId: data?.locationId.toString() ?? "",
    leagueId:
      seasons
        ?.find((item) => item.id.toString() === data?.seasonId.toString())
        ?.league.id.toString() || "",
    date: data?.date ?? defaultDate,
  };

  // Setup submit handler
  const onSubmit = async (values: MatchFormValues) => {
    const update = async () => {
      if (!id) return;
      await updateMatch(id, values);
      refetch();
    };
    const create = async () => {
      await createMatch(values);
      navigate(`${adminPrefix}/matches`);
    };

    setIsSubmitting(true);
    try {
      !!id ? await update() : await create();
    } catch (error) {
      alert(JSON.stringify(error));
    }
    setIsSubmitting(false);
  };

  // Setup validation
  const validate = (values: MatchFormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.homeTeamCsv) {
      errors.homeTeamCsv = "Required";
    }
    if (!values.awayTeamCsv) {
      errors.awayTeamCsv = "Required";
    }
    if (!values.leagueId) {
      errors.leagueId = "Required";
    }
    if (!values.seasonId) {
      errors.seasonId = "Required";
    }
    if (!values.homeTeamId) {
      errors.homeTeamId = "Required";
    }
    if (!values.awayTeamId) {
      errors.awayTeamId = "Required";
    }
    if (!values.round) {
      errors.round = "Required";
    }
    if (!values.type) {
      errors.type = "Required";
    }
    if (!values.locationId) {
      errors.locationId = "Required";
    }
    if (!values.date) {
      errors.date = "Required";
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

  useEffect(() => {
    formik.setFieldValue(
      "seasonId",
      seasons
        ?.find((item) => item.league.id.toString() === formik.values.leagueId)
        ?.id?.toString() || ""
    );
  }, [seasons, formik.values.leagueId]);

  // If fetching data for provided id, show loading
  if (id && isLoading) return <Spinner />;

  // If submitting, show loading
  if (isSubmitting) return <Spinner size="large" />;

  // If error fetching data, show error
  if (error) return <InputError error="Failed to load form" touched={true} />;

  const handleReadFile = (data: CSVRow[], key: string) => {
    setTeamCSVData((val) => ({
      ...val,
      [key]: data,
    }));
  };

  return (
    <Row>
      <Form onSubmit={formik.handleSubmit}>
        <FileInput
          label="Home - Upload CSV File"
          onChange={(val) => formik.setFieldValue("homeTeamCsv", val)}
          value={formik.values.homeTeamCsv}
          touched={formik.touched.homeTeamCsv}
          error={formik.errors.homeTeamCsv as string}
          onReadFile={(data: CSVRow[]) => handleReadFile(data, "homeTeamCsv")}
        />
        <FileInput
          label="Away - Upload CSV File"
          onChange={(val) => formik.setFieldValue("awayTeamCsv", val)}
          value={formik.values.awayTeamCsv}
          touched={formik.touched.awayTeamCsv}
          error={formik.errors.awayTeamCsv as string}
          onReadFile={(data: CSVRow[]) => handleReadFile(data, "awayTeamCsv")}
        />
        <Row>
          <TeamDropdown
            label="Home Team"
            value={formik.values.homeTeamId}
            onChange={formik.handleChange("homeTeamId")}
            touched={formik.touched.homeTeamId}
            error={formik.errors.homeTeamId}
            required
            asInput
          />
          <TeamDropdown
            label="Away Team"
            value={formik.values.awayTeamId}
            onChange={formik.handleChange("awayTeamId")}
            touched={formik.touched.awayTeamId}
            error={formik.errors.awayTeamId}
            required
            asInput
          />
        </Row>
        <Row>
          <LeagueDropdown
            label="League"
            value={formik.values.leagueId}
            onChange={formik.handleChange("leagueId")}
            touched={formik.touched.leagueId}
            error={formik.errors.leagueId}
            required
            asInput
          />
          <SeasonDropdown
            label="Season"
            value={formik.values.seasonId}
            onChange={formik.handleChange("seasonId")}
            touched={formik.touched.seasonId}
            error={formik.errors.seasonId}
            required
            asInput
            disabled
          />
        </Row>
        <Row>
          <RoundDropdown
            label="Round"
            value={formik.values.round}
            onChange={formik.handleChange("round")}
            touched={formik.touched.round}
            error={formik.errors.round}
            required
            asInput
          />
          <MatchTypeDropdown
            label="Match Type"
            value={formik.values.type}
            onChange={formik.handleChange("type")}
            touched={formik.touched.type}
            error={formik.errors.type}
            required
            asInput
          />
        </Row>

        <Row>
          <DateInput
            label="Date"
            value={formik.values.date}
            onChange={formik.handleChange("date")}
            touched={formik.touched.date}
            error={formik.errors.date}
            required
          />
          <TimeInput
            label="Time"
            value={formik.values.date}
            onChange={formik.handleChange("date")}
            touched={formik.touched.date}
            error={formik.errors.date}
            required
          />
        </Row>
        <LocationDropdown
          label="Location"
          value={formik.values.locationId}
          onChange={formik.handleChange("locationId")}
          touched={formik.touched.locationId}
          error={formik.errors.locationId}
          required
          asInput
        />
        <Button
          label={id ? "Save" : "Save as Draft"}
          onClick={() => formik.submitForm()}
          isSubmit
        />
      </Form>
      <div className="preview">
        {[
          {
            type: "hometeam",
            data: teamCSVData.homeTeamCsv,
            title: "Home",
            teamId: formik.values.homeTeamId,
          },
          {
            type: "awayteam",
            data: teamCSVData.awayTeamCsv,
            title: "Away",
            teamId: formik.values.awayTeamId,
          },
        ].map((item) => {
          const { teamId, data } = item;
          if (!data || !data.length) return null;
          return (
            <div className="preview__team preview__hometeam" key={item.type}>
              <h2 className={`preview__${item.type}--header`}>{item.title}</h2>
              <CSVPreview data={data} teamId={teamId}></CSVPreview>
            </div>
          );
        })}
      </div>
    </Row>
  );
};

export default MatchForm;
