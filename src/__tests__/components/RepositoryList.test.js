import { RepositoryListContainer } from "../../components/RepositoryList";
import { render, screen, within } from "@testing-library/react-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      screen.debug();

      // Add your test code here
      const repositoryItems = screen.getAllByTestId("repositoryItem");

      repositories.edges.forEach((edge, index) => {
        const node = edge.node;
        const item = within(repositoryItems[index]);

        expect(item.getByText(node.fullName)).toHaveTextContent(node.fullName);
        expect(item.getByText(node.description)).toHaveTextContent(
          node.description
        );
        expect(item.getByText(node.language)).toHaveTextContent(node.language);
        expect(item.getByText(node.forksCount.toString())).toHaveTextContent(
          node.forksCount.toString()
        );
        expect(
          item.getByText(node.stargazersCount.toString())
        ).toHaveTextContent(node.stargazersCount.toString());
        expect(item.getByText(node.ratingAverage.toString())).toHaveTextContent(
          node.ratingAverage.toString()
        );
        expect(item.getByText(node.reviewCount.toString())).toHaveTextContent(
          node.reviewCount.toString()
        );
      });
    });
  });
});
