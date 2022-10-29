import React, { useRef, useEffect, useState } from 'react';
import { mergeClasses } from "Helper/classify";
import defaultClasses from "./career.module.css";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import { useCareer } from "Talons/Career/useCareer";
import Button from "Components/Button";
import getImageUrl from "Helper/getImageUrl";
import RichContent from 'Components/RichContent';
import { useSelector } from "react-redux";
import Image from "../Image";
import Message from "Components/Message";
import { useConfig } from "Talons/App/useConfig";

const CareerContent = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes)
    const { formik, handleApplicationInWork, __, handleUploadFile, jobs, accountId, message } = useCareer()
    const { currentLocale } = useSelector(state => state.app)
    const contentRef = useRef(null)
    const { getConfigValue } = useConfig();

    if(!jobs || jobs && !jobs.length) {
        return <div className={classes.empty}>Հայտարարություներ չկան</div>
    }

    return (
        <div className={classes.root}>
            <div className={classes.announcements}>
                {jobs.map(item => {
                    const imageUrl = getImageUrl({ src: item.image, width: 500, height: 350, accountId });
                    const content = item?.content?.find(item => item.scope === currentLocale)
                    return (
                        <div className={classes.announcement}>
                            <div className={classes.imageField}>
                                <img src={imageUrl}/>
                            </div>
                            <div className={classes.announcementInfo}>
                                <p className={classes.applicantName}>{item.name}</p>
                                <RichContent html={content.value}/>
                                <div className={classes.buttonField}>
                                    <Button onClick={() => contentRef?.current?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    })}>Դիմել</Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={classes.container} ref={contentRef}>
                <div className={classes.content}>
                    <h1 className={classes.title}>{getConfigValue('jobBoardName')[currentLocale]}</h1>
                    <p className={classes.infoTitle}>{getConfigValue('jobBoardTitle')[currentLocale]}</p>
                    <p classNmae={classes.description}>{getConfigValue('jobBoardDescription')[currentLocale]}</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <TextInput
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        label={__('name')}
                        classes={{ input: classes.input }}
                    />
                    <div className={classes.error}>
                        {formik.errors.name && formik.touched.name ? (
                            <div className={classes.validationError}>{formik.errors.name}</div>) : null}
                    </div>
                    <TextInput
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        label={__('email')}
                        classes={{ input: classes.input }}
                    />
                    <div className={classes.error}>
                        {formik.errors.email && formik.touched.email ? (
                            <div className={classes.validationError}>{formik.errors.email}</div>) : null}
                    </div>
                    <TextInput
                        type="number"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        label={__('phone')}
                        classes={{ input: classes.input }}
                    />
                    <div className={classes.error}>
                        {formik.errors.phone && formik.touched.phone ? (
                            <div className={classes.validationError}>{formik.errors.phone}</div>) : null}
                    </div>
                    <div className={classes.checkBoxContainer}>
                        {jobs.map(item =>
                            <div key={item.id} className={classes.checkBox}><input type="checkbox"
                                                                                   value={formik?.values?.selectedWorks?.includes(item.name)}
                                                                                   onChange={() => handleApplicationInWork(item)}
                                                                                   label={item?.name}/>
                                <label style={{ marginLeft: "5px" }}>{item.name}</label>
                            </div>)
                        }
                        <div className={classes.error}>
                            {formik.errors.selectedWorks && formik.touched.selectedWorks ? (
                                <div className={classes.validationError}>{formik.errors.selectedWorks}</div>) : null}
                        </div>
                    </div>
                    <TextArea
                        type="text"
                        placeholder={"letter"}
                        name="letter"
                        value={formik.values.letter}
                        onChange={formik.handleChange}
                        label={__('first.name')}
                    />
                    <div className={classes.error}>
                        {formik.errors.letter && formik.touched.letter ? (
                            <div className={classes.validationError}>{formik.errors.letter}</div>) : null}
                    </div>
                    <input
                        id={"file"}
                        name={"file"}
                        type={"file"}
                        accept={["pdf"]}
                        onChange={(event) => handleUploadFile(event)} className="form-control"/>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        {formik.errors.file && formik.touched.file ? (
                            <div className={classes.validationError}>{formik.errors.file}</div>) : null}
                    </div>
                    <Button type={'submit'}>submit</Button>
                </form>
            </div>
            {message && message.type &&
            <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
        </div>
    );
};

export default CareerContent;