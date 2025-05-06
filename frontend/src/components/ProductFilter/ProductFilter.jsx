import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";

export const ProductFilter = ({ types, onFilterSubmit }) => {
  return (
    <Formik
      initialValues={{ type: "" }}
      onSubmit={(values) => {
        onFilterSubmit(values.type);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="m-0">
          <div className="d-flex align-items-end gap-3">
            <div className="flex-grow-1">
              {/* <label htmlFor="type" className="form-label">
                Product type
              </label> */}
              <Field as="select" name="type" id="type" className="form-select">
                <option value="">All types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
            </div>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Apply filter
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
