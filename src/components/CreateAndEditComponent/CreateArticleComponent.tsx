/* eslint-disable no-restricted-globals */
import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../helpers/Input";

interface ICreateComponentProps {
  error?: string;
  title?: string;
  description?: string;
  body?: string;
  tags?: string;
  onChange?: (value: string, type: string) => void;
  onSubmitHandler?: (event: any, type: string) => void;
}

const CreateArticleComponent = (props: ICreateComponentProps) => {
  const params = useParams();
  const { error, title, description, body, tags, onChange, onSubmitHandler } =
    props;
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {error && <li>{error}</li>}

            <form
              onSubmit={(e) =>
                onSubmitHandler(e, `${params.slug ? null : "create"}`)
              }
            >
              <fieldset>
                <Input
                  state="title"
                  value={title}
                  onChange={onChange}
                  type="text"
                  placeholder="Article Title"
                  required={true}
                />
                <Input
                  state="description"
                  value={description}
                  onChange={onChange}
                  type="text"
                  placeholder="What's this article about?"
                  required={true}
                />
                <fieldset className="form-group">
                  <textarea
                    value={body}
                    onChange={(e) => onChange(e.target.value, "body")}
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <Input
                  state="tags"
                  value={tags}
                  onChange={onChange}
                  type="text"
                  placeholder="Enter tags"
                  required={true}
                />
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleComponent;
