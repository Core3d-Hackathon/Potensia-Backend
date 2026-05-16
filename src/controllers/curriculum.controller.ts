import { Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../constants/http-status";
import {
  curriculumData,
  curriculumLookup,
  faseOptions,
  getCapaianByFaseAndSubject,
  getSubjectsByFase,
  JenjangKey,
  jenjangOptions,
} from "../data/curriculumData";
import { sendSuccess } from "../utils/api-response";
import { buildResponseMeta } from "../utils/response-meta";

const normalizeJenjangKey = (value: string) => value.toLowerCase() as JenjangKey;

const getJenjangOrThrow = (jenjangKey: string) => {
  const normalizedJenjangKey = normalizeJenjangKey(jenjangKey);
  const jenjang = curriculumLookup.jenjang[normalizedJenjangKey];

  if (!jenjang) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, `Jenjang '${jenjangKey}' was not found`);
  }

  return jenjang;
};

const getFaseOrThrow = (faseCode: string) => {
  const normalizedFaseCode = faseCode.toUpperCase();
  const fase = curriculumLookup.fase[normalizedFaseCode as keyof typeof curriculumLookup.fase];

  if (!fase) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, `Fase '${faseCode}' was not found`);
  }

  return fase;
};

const getRequiredRouteParam = (
  value: string | string[] | undefined,
  paramName: string,
) : string => {
  if (!value) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, `Route param '${paramName}' is required`);
  }

  if (Array.isArray(value)) {
    const firstValue = value[0];

    if (!firstValue) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, `Route param '${paramName}' is required`);
    }

    return firstValue;
  }

  return value;
};

export const getJenjangList = (req: Request, res: Response) => {
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Curriculum jenjang list fetched successfully",
    data: {
      jenjang: jenjangOptions,
    },
    meta: buildResponseMeta(req),
  });
};

export const getFaseList = (req: Request, res: Response) => {
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Curriculum fase list fetched successfully",
    data: {
      fase: faseOptions,
    },
    meta: buildResponseMeta(req),
  });
};

export const getFaseByJenjang = (req: Request, res: Response) => {
  const jenjangKey = getRequiredRouteParam(req.params.jenjangKey, "jenjangKey");
  const jenjang = getJenjangOrThrow(jenjangKey);
  const fase = jenjang.faseCodes.map((faseCode) => curriculumLookup.fase[faseCode]);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Curriculum fase list by jenjang fetched successfully",
    data: {
      jenjang,
      fase,
    },
    meta: buildResponseMeta(req),
  });
};

export const getSubjectsByFaseHandler = (req: Request, res: Response) => {
  const faseCode = getRequiredRouteParam(req.params.faseCode, "faseCode");
  const fase = getFaseOrThrow(faseCode);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Curriculum subject list by fase fetched successfully",
    data: {
      fase,
      subjects: getSubjectsByFase(fase.code),
    },
    meta: buildResponseMeta(req),
  });
};

export const getCapaianByFaseAndSubjectHandler = (req: Request, res: Response) => {
  const faseCode = getRequiredRouteParam(req.params.faseCode, "faseCode");
  const subjectNameParam = getRequiredRouteParam(req.params.subjectName, "subjectName");
  const fase = getFaseOrThrow(faseCode);
  const subjectName = decodeURIComponent(subjectNameParam);
  const subject = curriculumData[fase.code].subjects[subjectName];

  if (!subject) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      `Subject '${subjectName}' was not found in fase '${fase.code}'`,
    );
  }

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Curriculum capaian by fase and subject fetched successfully",
    data: {
      jenjang: curriculumLookup.jenjang[fase.jenjangKey],
      fase,
      subject: {
        name: subject.name,
        capaianKeys: subject.capaianKeys,
        capaian: getCapaianByFaseAndSubject(fase.code, subject.name),
      },
    },
    meta: buildResponseMeta(req),
  });
};
