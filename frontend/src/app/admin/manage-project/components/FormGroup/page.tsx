"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import addProject from "@/app/libs/addProject";
import { ITechStackItem, ITool, IProject, IOption } from "@/app/libs/types";
import Multiselect from 'multiselect-react-dropdown';
import { json } from "stream/consumers";

export default function FormGroup({
  id,
  projectData,
}: {
  id?: string;
  projectData: IProject;
}) {
  console.log("inside formgroup", projectData);
  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState(projectData);

  const [selected, setSelected] = useState([]);

  const options = [
    { name: "Grapes 🍇", value: "grapes", id: 1 },
    { name: "Mango 🥭", value: "mango", id: 2 },
    { name: "Strawberry 🍓", value: "strawberry", disabled: true, id: 3 },
  ];

  const selectedValues = [
    { name: "Grapes 🍇", value: "grapes", id: 1 },
  ]

  const formik = useFormik({
    // Logic: If ID is undefined use blank object else fetch data and use it as initial values
    initialValues: data,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      demoURL: Yup.string().nullable(),
      githubURL: Yup.string().nullable(),
      testimonial: Yup.string().nullable(),
      purposeAndGoal: Yup.string().nullable(),
      techStackItems: Yup.array()
        .min(1, "At least one tech stack item should be selected")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values))
      // setIsSaving(true);
      // try {
      //   const res = await addProject(values);
      //   console.log(res, "resss");
      // } catch (err) {
      // } finally {
      //   setIsSaving(false);
      // }
    },
  });

  const onSelect = (selectedList:any, selectedItem:any)=> {
    console.log("selected list",selectedList)
    formik.setFieldValue("techStackItems",selectedList)
}

  if (isLoading) return <>Loading...</>;



  return (
    <section className="portfolio-details-top">
      <div className="mx-5 my-3 mb-4">
        {/* Check if ID is undefined and render heading */}
        <h2 className="heading-secondary">
          {id ? "Edit project" : "Create new project"}
        </h2>
      </div>
      <form className="container" onSubmit={formik.handleSubmit}>
        {/* Title */}
        <div className="form-element">
          <label className="form-title" htmlFor="title">
            Title*
          </label>
          <input
            id="title"
            title="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="form-text-area"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="form-error">{formik.errors.title}</div>
          ) : null}
        </div>

        {/* Description */}
        <div className="form-element">
          <label className="form-title" htmlFor="description">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="form-text-area"
            rows={5}
            cols={10}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="form-error">{formik.errors.description}</div>
          ) : null}
        </div>

        {/* Purpose and Goal */}
        <div className="form-element">
          <label className="form-title" htmlFor="purposeAndGoal">
            Purpose and goal
          </label>
          <textarea
            id="purposeAndGoal"
            name="purposeAndGoal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.purposeAndGoal}
            className="form-text-area"
            rows={5}
            cols={10}
          />
          {formik.touched.purposeAndGoal && formik.errors.purposeAndGoal ? (
            <div className="form-error">{formik.errors.purposeAndGoal}</div>
          ) : null}
        </div>

        {/* Testimonial */}
        <div className="form-element">
          <label className="form-title" htmlFor="testimonial">
            Testimonial
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.testimonial}
            className="form-text-area"
            rows={5}
            cols={10}
          />
          {formik.touched.testimonial && formik.errors.testimonial ? (
            <div className="form-error">{formik.errors.testimonial}</div>
          ) : null}
        </div>

        {/* Tech stack selection */}
        <div className="form-element form-dropdown-container">
          <label className="form-title">Tech-Stack Items</label>

          <Multiselect
            options={options} // Options to display in the dropdown
            selectedValues={selectedValues} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onSelect} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            style={{option: {
              fontSize: 14
            },multiselectContainer:{
              border: "0.5px solid #000",
              borderRadius: 3,
            }}}
          />

          {formik.touched.techStackItems && formik.errors.techStackItems ? (
            <div style={{marginTop:8}} className="form-error">
              {formik.errors.techStackItems}
            </div>
          ) : null}
        </div>

        {/* Tools selection */}
        <div className="form-element">
          <label className="form-title">Tools</label>

          {/* {formik.touched.tools && formik.errors.tools ? (
            <div className="form-error">{(formik.errors.tools)}</div>
          ) : null} */}
        </div>

        {/* Github URL */}
        <div className="form-element">
          <label className="form-title" htmlFor="githubURL">
            GitHub URL
          </label>
          <input
            id="githubURL"
            title="githubURL"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.githubURL}
            className="form-text-area"
          />
          {formik.touched.githubURL && formik.errors.githubURL ? (
            <div className="form-error">{formik.errors.githubURL}</div>
          ) : null}
        </div>

        {/* Demo URL */}
        <div className="form-element">
          <label className="form-title" htmlFor="demoURL">
            Demo URL
          </label>
          <input
            id="demoURL"
            title="demoURL"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.demoURL}
            className="form-text-area"
          />
          {formik.touched.demoURL && formik.errors.demoURL ? (
            <div className="form-error">{formik.errors.demoURL}</div>
          ) : null}
        </div>

        <button disabled={isSaving} className="form-button" type="submit">
          {isSaving ? "Saving" : "Submit"}
        </button>
      </form>
    </section>
  );
}
