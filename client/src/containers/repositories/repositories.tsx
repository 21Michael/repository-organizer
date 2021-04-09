import React, { useState } from "react";
import classes from "./repositories.module.scss";
import ButtonLink from "../../components/UI/buttonLink/buttonLink";
import Table from "../../components/UI/table/table";
import { InitialState } from "../../types/containers/repositories";
import { useMutation, useQuery } from '@apollo/client';
import { REPOSITORIES_QUERY, REMOVE_REPOSITORY_MUTATION } from "./query";
import { CURRENT_USER_QUERY } from "../header/query";
import Notification from "../../components/UI/notification/notification";

const Repositories: React.FC = () => {
  const userQuery = useQuery(CURRENT_USER_QUERY);
  const repositoriesQuery = useQuery(REPOSITORIES_QUERY);

  const [removeRepository, removeRepositoryQuery] = useMutation(REMOVE_REPOSITORY_MUTATION, {
    update: (cache, {data}) => {
      const { _id } = data.removeRepository;
      const { repositories }:any = cache.readQuery({query:REPOSITORIES_QUERY});

      if(!_id && !repositories) return null;

      const newRepositories = repositories.filter((el: any) => el._id !== _id );
      cache.writeQuery({
        query: REPOSITORIES_QUERY,
        data: { repositories: [...newRepositories] },
      });
    }
  });

  const { currentUser } = userQuery?.data || false;
  const { repositories } = repositoriesQuery.data || false;

  const initialState: InitialState = {
    buttonLink: {
      label: "add",
      to: "repository/add",
      classModifier: "add",
    },
    tableHeader: {
      titles: ["name", "description", "stars", "creator name", "created at"],
    },
  };

  const [table] = useState<InitialState>(initialState);

  const removeRepositoryHandler = (id: string) => removeRepository({ variables: { id } });

  return (
    <main className={classes.main}>
      <div className={classes.main__wrapper}>
        {currentUser && currentUser?.signedBy !== "github" ? (
          <ButtonLink
            to={table.buttonLink.to}
            label={table.buttonLink.label}
            classModifier={table.buttonLink.classModifier}
          />) : null
        }
        {removeRepositoryQuery.loading || repositoriesQuery.loading ?  
          <Notification notification={{message: "Loading....", type: 'pending'}} /> : null
        }
        {removeRepositoryQuery.data ?
          <Notification notification={{message: "Repository successfully removed!", type: 'success'}} /> : null
        }
        {repositoriesQuery.data ? 
          <Table
            tableHeader={table.tableHeader}
            tableBody={repositories}
            deleteRowHandler={removeRepositoryHandler}
            page="repository"
            signedIn={!!currentUser}
            user={currentUser}
          /> : null
        }
      </div>
    </main>
  );
};

export default Repositories;
