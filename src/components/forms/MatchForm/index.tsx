import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  createMatch,
  getMatch,
  getMatchValidation,
  MatchFormValues,
  publishMatch,
  updateMatch,
} from "../../../api/matches";
import { getSeasons } from "../../../api/seasons";
import { MatchStatus } from "../../../types/enums";
import { Button, Spinner } from "../../common";
import { LeagueDropdown } from "../../dropdowns";
import LocationDropdown from "../../dropdowns/LocationDropdown";
import MatchTypeDropdown from "../../dropdowns/MatchTypeDropdown";
import SeasonDropdown from "../../dropdowns/SeasonDropdown";
import TeamDropdown from "../../dropdowns/TeamDropdown";
import { DateInput, InputError } from "../../input";
import FileInput from "../../input/FileInput/FileInput";
import NumberInput from "../../input/NumberInput/NumberInput";
import TimeInput from "../../input/TimeInput/TimeInput";
import { Form, Row } from "../../layout";
import CSVPreview from "./components/CSVPreview";
import "./MatchForm.scss";

const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;
const defaultDate = new Date().toISOString();

const MatchForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [teamCSVData, setTeamCSVData] = useState<{
    homeTeamCsv?: string[];
    awayTeamCsv?: string[];
  }>({});
  const [homePlayerIds, setHomePlayerIds] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [awayPlayerIds, setAwayPlayerIds] = useState<{
    [key: string]: string | undefined;
  }>({});

  // Setup react-query for fetching data
  const { isLoading, data, refetch, error } = useQuery(
    ["getMatch", { id }],
    async () => {
      if (id) return getMatch(+id);
    }
  );

  // Check match validation to publish
  // const { data: matchValidation } = useQuery(
  //   ["getMatchValidation", { id }],
  //   async () => {
  //     if (id) return getMatchValidation(+id);
  //   }
  // );

  useEffect(() => {
    setTeamCSVData({
      homeTeamCsv: data?.players
        ?.filter((item) => item.teamId === data.homeTeamId)
        ?.map((item) => item.playerNumber?.toString()),
      awayTeamCsv: data?.players
        ?.filter((item) => item.teamId === data.awayTeamId)
        ?.map((item) => item.playerNumber?.toString()),
    });
  }, [data]);

  const { data: seasons } = useQuery(["getSeasons"], async () => getSeasons());

  const disabled = useMemo(
    () => data?.status === MatchStatus.PUBLISHED,
    [data]
  );

  // Setup initial values
  const initialValues: MatchFormValues = {
    homeTeamCsv: data?.awayTeamCsv ?? "",
    awayTeamCsv: data?.awayTeamCsv ?? "",
    seasonId: data?.seasonId?.toString() ?? "",
    homeTeamId: data?.homeTeamId?.toString() ?? "",
    awayTeamId: data?.awayTeamId?.toString() ?? "",
    round: data?.round?.toString() ?? "",
    type: data?.type ?? "",
    locationId: data?.locationId?.toString() ?? "",
    leagueId:
      seasons
        ?.find((item) => item.id.toString() === data?.seasonId?.toString())
        ?.league.id.toString() || "",
    date: data?.date ?? defaultDate,
  };

  // Setup submit handler
  const onSubmit = async (values: MatchFormValues) => {
    const update = async () => {
      if (!id) return;
      await updateMatch(id, { ...values, homePlayerIds, awayPlayerIds });
      refetch();
    };
    const create = async () => {
      await createMatch({ ...values, homePlayerIds, awayPlayerIds });
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

  const handlePublish = async () => {
    if (!id) return;
    setIsSubmitting(true);
    await publishMatch(id);
    refetch();
    setIsSubmitting(false);
  };

  // Setup validation
  const validate = (values: MatchFormValues) => {
    const errors: { [key: string]: string } = {};
    if (data?.status === MatchStatus.PUBLISHED) {
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
      [key]: data.reduce((arr: number[], item) => {
        try {
          if (item.Code.toLowerCase().includes("unknown")) return arr;
          const value = +item.Code.split(" ")[0].substring(1);

          if (!value || isNaN(value)) return arr;

          return [...arr, value];
        } catch (error) {
          return arr;
        }
      }, []),
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
          <LeagueDropdown
            label="League"
            value={formik.values.leagueId}
            onChange={(value) => {
              formik.handleChange("leagueId")(value);
              formik.handleChange("seasonId")("");
            }}
            touched={formik.touched.leagueId}
            error={formik.errors.leagueId}
            required
            asInput
            disabled={disabled}
          />
          <SeasonDropdown
            label="Season"
            value={formik.values.seasonId}
            onChange={(value) => {
              formik.handleChange("seasonId")(value);
              formik.handleChange("homeTeamId")("");
              formik.handleChange("awayTeamId")("");
            }}
            touched={formik.touched.seasonId}
            error={formik.errors.seasonId}
            required
            asInput
            requireLeague
            leagueId={formik.values.leagueId}
            disabled={disabled}
          />
        </Row>
        <Row>
          <TeamDropdown
            label="Home Team"
            value={formik.values.homeTeamId}
            onChange={formik.handleChange("homeTeamId")}
            touched={formik.touched.homeTeamId}
            error={formik.errors.homeTeamId}
            required
            asInput
            requireSeason
            seasonId={formik.values.seasonId}
            filter={(team) => team.id !== +formik.values.awayTeamId}
            disabled={disabled}
          />
          <TeamDropdown
            label="Away Team"
            value={formik.values.awayTeamId}
            onChange={formik.handleChange("awayTeamId")}
            touched={formik.touched.awayTeamId}
            error={formik.errors.awayTeamId}
            required
            asInput
            requireSeason
            seasonId={formik.values.seasonId}
            filter={(team) => team.id !== +formik.values.homeTeamId}
            disabled={disabled}
          />
        </Row>
        <Row>
          <NumberInput
            label="Round"
            value={formik.values.round}
            onChange={formik.handleChange("round")}
            touched={formik.touched.round}
            error={formik.errors.round}
            required
            onlyInteger
            placeholder="Round"
            disabled={disabled}
          />
          <MatchTypeDropdown
            label="Match Type"
            value={formik.values.type}
            onChange={formik.handleChange("type")}
            touched={formik.touched.type}
            error={formik.errors.type}
            required
            asInput
            disabled={disabled}
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
            disabled={disabled}
          />
          <TimeInput
            label="Time"
            value={formik.values.date}
            onChange={formik.handleChange("date")}
            touched={formik.touched.date}
            error={formik.errors.date}
            required
            disabled={disabled}
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
          disabled={disabled}
        />
        {data?.status !== MatchStatus.PUBLISHED && (
          <Row noFlex justifyContent={"flex-start"}>
            <Button
              label={"Save as Draft"}
              onClick={() => {
                formik.submitForm();
              }}
              isSubmit
            />
            {!!id && (
              <Button
                label={"Publish Report"}
                onClick={handlePublish}
                isSubmit
                // isDisabled={!matchValidation?.isValid}
                isDisabled={!data?.isCanPublish}
              />
            )}
          </Row>
        )}
      </Form>
      <div className="preview">
        {[
          {
            type: "hometeam",
            playerNumberList: teamCSVData.homeTeamCsv,
            title: "Home",
            teamId: formik.values.homeTeamId,
            onChange: (val: typeof homePlayerIds) => setHomePlayerIds(val),
          },
          {
            type: "awayteam",
            playerNumberList: teamCSVData.awayTeamCsv,
            title: "Away",
            teamId: formik.values.awayTeamId,
            onChange: (val: typeof awayPlayerIds) => setAwayPlayerIds(val),
          },
        ].map((item) => {
          const { teamId, playerNumberList, onChange } = item;
          if (!(!isLoading && playerNumberList && playerNumberList.length))
            return null;

          return (
            <div className="preview__team preview__hometeam" key={item.type}>
              <h2 className={`preview__${item.type}--header`}>{item.title}</h2>
              <CSVPreview
                playerNumberList={playerNumberList}
                teamId={teamId}
                onChange={onChange}
                playersOnMatch={data?.players}
                key={teamId}
                matchId={id}
                disabled={disabled}
              ></CSVPreview>
            </div>
          );
        })}
      </div>
    </Row>
  );
};

export default MatchForm;
