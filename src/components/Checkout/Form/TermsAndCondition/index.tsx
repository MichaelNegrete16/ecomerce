import React, { useEffect, useState } from "react";

import styles from "../Form.module.css";
import useAppDispatch from "@/redux/useAppDisppatch";
import {
  setAcceptanceToken,
  setPersonalToken,
  setPrivacyAccepted,
  setTermsAccepted,
} from "@/redux/slices/cartSlice";
import {
  IGetDataMerchant,
  useLazyGetMerchantDataQuery,
} from "@/redux/slices/cart.api";

const TermsAndCondition = () => {
  const dispatch = useAppDispatch();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [dataMerchant, setDataMerchant] = useState<IGetDataMerchant | null>(
    null
  );
  const [termsMerchant] = useLazyGetMerchantDataQuery();

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const data = await termsMerchant().unwrap();
        setDataMerchant(data);
      } catch (error) {
        console.error("Error fetching merchant data:", error);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className={styles.checkboxSection}>
      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          id="acceptTerms"
          checked={acceptTerms}
          onChange={(e) => {
            setAcceptTerms(e.target.checked);
            dispatch(setTermsAccepted(e.target.checked));
            if (e.target.checked) {
              dispatch(
                setAcceptanceToken(
                  dataMerchant?.presigned_acceptance.acceptance_token || ""
                )
              );
            } else {
              dispatch(setAcceptanceToken(""));
            }
          }}
          required
        />
        <label htmlFor="acceptTerms" className={styles.checkboxLabel}>
          Acepto los{" "}
          <a
            href={dataMerchant?.presigned_acceptance.permalink}
            className={styles.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            términos y condiciones
          </a>{" "}
          de la tienda *
        </label>
      </div>

      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          id="acceptPrivacy"
          checked={acceptPrivacy}
          onChange={(e) => {
            setAcceptPrivacy(e.target.checked);
            dispatch(setPrivacyAccepted(e.target.checked));
            if (e.target.checked) {
              dispatch(
                setPersonalToken(
                  dataMerchant?.presigned_personal_data_auth.acceptance_token ||
                    ""
                )
              );
            } else {
              dispatch(setPersonalToken(""));
            }
          }}
          required
        />
        <label htmlFor="acceptPrivacy" className={styles.checkboxLabel}>
          Acepto la{" "}
          <a
            href={dataMerchant?.presigned_personal_data_auth.permalink}
            className={styles.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            política de privacidad
          </a>{" "}
          y el tratamiento de mis datos personales *
        </label>
      </div>
    </div>
  );
};

export default TermsAndCondition;
