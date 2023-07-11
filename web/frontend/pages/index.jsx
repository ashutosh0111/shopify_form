import React, { useState, useCallback } from "react";
import {
  Card,
  Page,
  Layout,
  TextContainer,
  Stack,
  Link,
  Text,
  Form,
  FormLayout,
  TextField,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

export default function HomePage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleEmailChange = useCallback((value) => {
    setEmail(value);
  }, []);

  const handleSubmit = useCallback(
    (values) => {
      (async () => {
        const parsedBody = { ...values };
        parsedBody.destination = parsedBody.destination[0];
        const formId = form?.id;
  
        const url = formId ? `/api/form/${formId}` : "/api/form";
        const method = formId ? "PATCH" : "POST";
  
        const response = await fetch(url, {
          method,
          body: JSON.stringify(parsedBody),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          makeClean();
          const form = await response.json();
  
          if (!formId) {
            navigate(`/form/${form.id}`);
          } else {
            setForm(form);
          }
        }
      })();
      return { status: "success" };
    },
    [form, setForm, makeClean, navigate]
  );
  

  const validate = useCallback((values) => {
    const email = values.email;
    if (!email || !email.includes("@")) {
      return "Please enter a valid email address.";
    }
    return null;
  }, []);

  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack wrap={false} spacing="extraTight" alignment="center">
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Text as="h2" variant="headingMd">
                    {t("HomePage.heading")}
                  </Text>
                  <p>
                    <Trans
                      i18nKey="HomePage.yourAppIsReadyToExplore"
                      components={{
                        PolarisLink: (
                          <Link url="https://polaris.shopify.com/" external />
                        ),
                        AdminApiLink: (
                          <Link
                            url="https://shopify.dev/api/admin-graphql"
                            external
                          />
                        ),
                        AppBridgeLink: (
                          <Link
                            url="https://shopify.dev/apps/tools/app-bridge"
                            external
                          />
                        ),
                      }}
                    />
                  </p>
                  <p>{t("HomePage.startPopulatingYourApp")}</p>
                  <p>
                    <Trans
                      i18nKey="HomePage.learnMore"
                      components={{
                        ShopifyTutorialLink: (
                          <Link
                            url="https://shopify.dev/apps/getting-started/add-functionality"
                            external
                          />
                        ),
                      }}
                    />
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <img
                    src={trophyImage}
                    alt={t("HomePage.trophyAltText")}
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <Form onSubmit={handleSubmit} validate={validate}>
              <FormLayout>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                />
                <Button primary submit>
                  Submit
                </Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
        {/* Add other sections or components as required */}
      </Layout>
    </Page>
  );
}
