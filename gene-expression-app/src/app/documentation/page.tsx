"use client"
import BioBackground from "../components/BioBackground"

export default function Documentation() {
  return (
    <main style={{
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
      paddingTop: "100px",
      padding: "100px 40px 40px",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      <BioBackground />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 className="text-glow" style={{
          fontSize: "48px",
          fontWeight: 700,
          marginBottom: "30px",
          color: "#e0f2fe"
        }}>
          Documentation
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            What is This System?
          </h2>
          <p className="info-text" style={{ marginBottom: "15px", lineHeight: "1.8", fontSize: "16px" }}>
            The Gene Expression Analyzer is a comprehensive bioinformatics platform designed 
            to process, analyze, and visualize gene expression data from molecular biology experiments. 
            This system enables researchers to upload gene expression datasets in CSV format, perform 
            automated statistical analysis, and generate visual comparisons between different datasets.
          </p>
          <p className="info-text" style={{ marginBottom: "15px", lineHeight: "1.8", fontSize: "16px" }}>
            The platform serves as a shared computational resource that eliminates redundant 
            processing by detecting previously analyzed files through content-based hashing. 
            This intelligent caching mechanism ensures that identical datasets are not re-analyzed, 
            saving computational resources and time while maintaining a complete history of all 
            analysis operations.
          </p>
          <p className="info-text" style={{ lineHeight: "1.8", fontSize: "16px" }}>
            Built on modern web technologies, the system provides a seamless user experience for 
            bioinformatics researchers, combining powerful backend processing with an intuitive 
            frontend interface. The architecture is designed to handle large-scale gene expression 
            matrices efficiently while maintaining data integrity and providing real-time feedback 
            to users throughout the analysis process.
          </p>
        </div>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            How Does It Work? - Deep Dive
          </h2>
          <p className="info-text" style={{ marginBottom: "24px", lineHeight: "1.8", fontSize: "16px" }}>
            The system operates through a sophisticated multi-stage pipeline that combines file processing, 
            cryptographic hashing, database operations, statistical computation, and visualization. 
            Each stage is optimized for performance and reliability:
          </p>
          
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <div style={{
              padding: "24px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                1. File Upload & Cryptographic Hashing
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                When a CSV file is uploaded through the Analyzer interface, the system immediately 
                computes a cryptographic hash (typically SHA-256) of the entire file content. This 
                hash serves as a unique digital fingerprint that uniquely identifies the dataset 
                regardless of filename or metadata changes.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                The hashing process reads the file in chunks to handle large files efficiently, 
                ensuring that even multi-gigabyte expression matrices can be processed without 
                overwhelming system memory. The resulting hash is a fixed-length hexadecimal string 
                that acts as a deterministic identifier - identical files always produce the same hash, 
                while different files produce different hashes with extremely high probability.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                After hashing, the CSV file is parsed using a robust CSV parser that handles various 
                edge cases including quoted fields, escaped characters, and different line endings. 
                The parser extracts gene identifiers from the first column and expression values 
                from subsequent columns, validating data types and handling missing or malformed entries.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                2. Duplicate Detection & Database Lookup
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                Before performing any computational analysis, the system performs an optimized database 
                query using the computed file hash as a unique key. This lookup operation uses indexed 
                database queries for O(log n) time complexity, making duplicate detection extremely fast 
                even with thousands of previously analyzed files.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                If a matching hash is found in the database, the system immediately retrieves the 
                previously computed results without any re-processing. This includes all statistical 
                metrics, metadata, and timestamps from the original analysis. The system also updates 
                the access timestamp to track usage patterns.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                The duplicate detection mechanism is designed to be deterministic and consistent - 
                the same file will always produce the same hash, and the same hash will always 
                retrieve the same results. This ensures reproducibility and eliminates any possibility 
                of inconsistent results from identical input data.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                3. Statistical Analysis & Computation
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                For new files (those not found in the database), the system performs comprehensive 
                statistical analysis. The analysis pipeline processes the parsed data through multiple 
                computational stages:
              </p>
              <ul style={{
                paddingLeft: "24px",
                marginBottom: "12px",
                lineHeight: "2",
                color: "#cbd5e1",
                fontSize: "15px"
              }}>
                <li><strong style={{ color: "#00f0ff" }}>Gene Count:</strong> The system counts the 
                total number of unique gene identifiers in the first column, excluding header rows and 
                empty entries. This provides researchers with immediate insight into the scale of their 
                dataset.</li>
                <li><strong style={{ color: "#00f0ff" }}>Sample Count:</strong> The number of samples 
                is determined by counting the columns after the gene identifier column, excluding the 
                header. This metric indicates the number of experimental conditions, time points, or 
                biological replicates in the dataset.</li>
                <li><strong style={{ color: "#00f0ff" }}>Mean Expression:</strong> The system computes 
                the arithmetic mean of all expression values across all genes and all samples. This 
                calculation handles missing values appropriately and provides a global measure of 
                expression level in the dataset.</li>
              </ul>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                All statistical computations are performed using floating-point arithmetic with appropriate 
                precision handling. The system validates numerical data, handles edge cases like division 
                by zero, and ensures that all computed metrics are mathematically sound and reproducible.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                4. Data Storage & Database Architecture
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                Analysis results are stored in a relational database using an Object-Relational Mapping 
                (ORM) framework. The database schema is designed with the following key components:
              </p>
              <ul style={{
                paddingLeft: "24px",
                marginBottom: "12px",
                lineHeight: "2",
                color: "#cbd5e1",
                fontSize: "15px"
              }}>
                <li><strong style={{ color: "#00f0ff" }}>Unique Identifier:</strong> Each analysis 
                record has a UUID (Universally Unique Identifier) that serves as the primary key, 
                ensuring global uniqueness and preventing collisions.</li>
                <li><strong style={{ color: "#00f0ff" }}>File Hash:</strong> The cryptographic hash 
                is stored as a unique indexed field, enabling fast duplicate detection queries.</li>
                <li><strong style={{ color: "#00f0ff" }}>Metadata:</strong> Original filename, file 
                size, and upload timestamp are stored to provide context and traceability.</li>
                <li><strong style={{ color: "#00f0ff" }}>Statistics:</strong> All computed metrics 
                (gene count, sample count, mean expression) are stored as numeric fields with appropriate 
                precision.</li>
                <li><strong style={{ color: "#00f0ff" }}>Timestamps:</strong> Both creation and 
                last-access timestamps are maintained for audit trails and usage analytics.</li>
              </ul>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                The database uses ACID (Atomicity, Consistency, Isolation, Durability) properties to 
                ensure data integrity. Transactions are used to guarantee that all database operations 
                either complete successfully or are rolled back, preventing partial updates and 
                maintaining data consistency even in error conditions.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                5. Visualization & Comparative Analysis
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                The Charts feature enables researchers to select multiple analyzed datasets and generate 
                comparative visualizations. The visualization engine retrieves mean expression values 
                from selected datasets and renders them using interactive charting libraries.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                The chart generation process involves data aggregation, normalization for display, and 
                rendering with appropriate scaling and labeling. Charts are generated client-side using 
                modern JavaScript libraries, providing responsive and interactive visualizations that 
                adapt to different screen sizes and allow users to explore the data dynamically.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                This comparative visualization capability allows researchers to identify patterns, trends, 
                and outliers across different experiments, conditions, or time points. The visual 
                representation makes it easier to spot significant differences in expression levels 
                and facilitates hypothesis generation for further experimental validation.
              </p>
            </div>
          </div>
        </div>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            Why This System? - Detailed Rationale
          </h2>
          <p className="info-text" style={{ marginBottom: "24px", lineHeight: "1.8", fontSize: "16px" }}>
            Gene expression analysis is a fundamental task in modern molecular biology research, 
            but traditional approaches suffer from several critical limitations that this platform 
            addresses systematically:
          </p>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <div style={{
              padding: "24px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "12px"
              }}>
                Eliminates Redundant Computation
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                Traditional gene expression analysis workflows require researchers to re-process 
                datasets every time they need to access results, even if the data hasn't changed. 
                This leads to significant waste of computational resources, especially for large-scale 
                datasets that may take minutes or hours to process.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                By implementing content-based duplicate detection using cryptographic hashing, this 
                system ensures that identical datasets are never processed twice. The hash-based 
                approach is superior to filename-based detection because it identifies duplicates 
                even when files have different names, are stored in different locations, or have 
                different metadata.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                This optimization becomes increasingly valuable as research teams grow and datasets 
                are shared across multiple researchers. The computational savings compound over time, 
                reducing server load, energy consumption, and processing costs while maintaining 
                instant access to previously computed results.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "12px"
              }}>
                Centralized Data Management & Reproducibility
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                In traditional research workflows, gene expression analysis results are often stored 
                in scattered locations - individual researcher computers, shared drives, or email 
                attachments. This fragmentation makes it difficult to track analysis history, compare 
                results across experiments, or ensure reproducibility.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                This platform provides a centralized repository where all analysis results are stored 
                with complete metadata, timestamps, and provenance information. Every analysis is 
                automatically logged with its input file hash, computed statistics, and execution 
                timestamp, creating a comprehensive audit trail that supports reproducibility and 
                scientific rigor.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                The centralized approach also enables advanced features like cross-dataset comparison, 
                trend analysis over time, and identification of frequently analyzed datasets. 
                Researchers can easily track their computational work, share results with collaborators, 
                and maintain organized records of their research activities.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "12px"
              }}>
                Facilitates Collaborative Research & Knowledge Sharing
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                Modern biological research is increasingly collaborative, with multiple researchers 
                working on related projects, sharing datasets, and building upon each other's work. 
                However, traditional analysis workflows create silos where each researcher processes 
                data independently, leading to duplicate work and missed opportunities for knowledge 
                sharing.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                This platform breaks down these silos by creating a shared computational resource 
                where analysis results are immediately available to all users. When one researcher 
                analyzes a dataset, that result becomes accessible to the entire research community, 
                eliminating redundant work and enabling faster scientific progress.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                The collaborative nature of the platform also facilitates serendipitous discoveries 
                - researchers may discover that datasets they need have already been analyzed by 
                colleagues, or they may identify interesting patterns by comparing their results with 
                previously analyzed datasets from related experiments.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "12px"
              }}>
                Streamlines Research Workflow & Reduces Technical Barriers
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                Traditional gene expression analysis requires researchers to master multiple tools 
                and technologies - command-line tools for data processing, statistical software for 
                analysis, visualization tools for plotting, and database systems for result storage. 
                This technical complexity creates barriers that slow down research and require 
                significant training investment.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                This platform integrates all these capabilities into a single, user-friendly web 
                interface that requires no installation, no command-line knowledge, and minimal 
                technical training. Researchers can upload files, view results, and generate 
                visualizations through intuitive point-and-click interactions, allowing them to 
                focus on scientific interpretation rather than technical implementation.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                The streamlined workflow reduces the time from data collection to insight, enabling 
                faster iteration cycles and more responsive research. This is particularly valuable 
                in time-sensitive research contexts where rapid analysis and decision-making are 
                critical for experimental design and hypothesis validation.
              </p>
            </div>
          </div>
        </div>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            File Format Requirements - Detailed Specification
          </h2>
          <p className="info-text" style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
            The platform accepts CSV (Comma-Separated Values) files with a specific structure designed 
            to accommodate standard gene expression matrix formats. Understanding the exact requirements 
            ensures successful data processing:
          </p>
          
          <div style={{
            padding: "24px",
            background: "rgba(0, 240, 255, 0.05)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#00f0ff",
              marginBottom: "16px"
            }}>
              Required Structure
            </h3>
            <ul style={{
              paddingLeft: "24px",
              lineHeight: "2.2",
              color: "#cbd5e1",
              fontSize: "15px",
              marginBottom: "16px"
            }}>
              <li><strong style={{ color: "#00f0ff" }}>First Column:</strong> Must contain gene names 
              or identifiers. This column serves as the row identifier and should have a header (typically 
              "Gene" or "GeneID"). Each row represents one gene, and the identifier should be unique 
              within the file.</li>
              <li><strong style={{ color: "#00f0ff" }}>Remaining Columns:</strong> Each subsequent 
              column represents one sample (experimental condition, time point, biological replicate, 
              etc.). These columns contain numerical expression values, typically representing 
              normalized read counts, FPKM values, TPM values, or similar expression metrics.</li>
              <li><strong style={{ color: "#00f0ff" }}>Header Row:</strong> The first row must contain 
              column names. The first column header should identify it as containing gene information 
              (e.g., "Gene", "GeneID", "Gene_Symbol"). Remaining headers should identify samples 
              (e.g., "Sample1", "ConditionA_Rep1", "TimePoint_0h").</li>
              <li><strong style={{ color: "#00f0ff" }}>Data Types:</strong> Gene identifiers can be 
              alphanumeric strings. Expression values must be numeric (integers or floating-point 
              numbers). Missing values can be represented as empty cells, "NA", "NaN", or similar 
              placeholders.</li>
            </ul>
          </div>

          <div style={{
            padding: "24px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#c4b5fd",
              marginBottom: "16px"
            }}>
              File Format Constraints
            </h3>
            <ul style={{
              paddingLeft: "24px",
              lineHeight: "2.2",
              color: "#cbd5e1",
              fontSize: "15px",
              marginBottom: "16px"
            }}>
              <li><strong style={{ color: "#c4b5fd" }}>File Extension:</strong> Files must have a 
              .csv extension. Other formats (XLSX, TSV, TXT, etc.) are not directly supported and 
              must be converted to CSV format before upload.</li>
              <li><strong style={{ color: "#c4b5fd" }}>Encoding:</strong> Files should use UTF-8 
              encoding to ensure proper handling of special characters in gene names. ASCII encoding 
              is also acceptable for files containing only standard alphanumeric characters.</li>
              <li><strong style={{ color: "#c4b5fd" }}>Delimiter:</strong> The system expects 
              comma-separated values. Files using other delimiters (tabs, semicolons) must be 
              converted to comma-separated format.</li>
              <li><strong style={{ color: "#c4b5fd" }}>File Size:</strong> While there's no hard 
              limit, very large files (hundreds of MB or GB) may take longer to process. The system 
              is optimized for typical gene expression matrices containing thousands to tens of 
              thousands of genes.</li>
            </ul>
          </div>

          <div style={{
            padding: "24px",
            background: "rgba(0, 240, 255, 0.05)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: "8px"
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#00f0ff",
              marginBottom: "16px"
            }}>
              Example Format
            </h3>
            <pre style={{
              background: "rgba(15, 23, 42, 0.6)",
              padding: "16px",
              borderRadius: "6px",
              overflowX: "auto",
              fontSize: "13px",
              color: "#cbd5e1",
              lineHeight: "1.6",
              border: "1px solid rgba(0, 240, 255, 0.1)"
            }}>
{`Gene,Sample1,Sample2,Sample3
GENE001,12.5,15.3,18.7
GENE002,8.2,9.1,7.5
GENE003,25.4,22.8,24.1`}
            </pre>
            <p className="info-text" style={{ 
              marginTop: "16px", 
              lineHeight: "1.8", 
              fontSize: "14px",
              fontStyle: "italic"
            }}>
              This example shows the minimal required structure: a header row with column names, 
              followed by data rows with gene identifiers in the first column and expression 
              values in subsequent columns.
            </p>
          </div>
        </div>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            Features Overview - Comprehensive Guide
          </h2>
          
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <div style={{
              padding: "24px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                Analyzer Module
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                The Analyzer is the core data processing module of the platform. It provides a 
                streamlined interface for uploading gene expression CSV files and automatically 
                performing comprehensive statistical analysis.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                Key capabilities include automatic duplicate detection through cryptographic hashing, 
                robust CSV parsing that handles various edge cases, comprehensive statistical computation 
                including gene count, sample count, and mean expression calculations, and immediate 
                result display with formatted numerical output.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                The module provides real-time feedback during processing, error handling for 
                malformed files, and clear messaging when duplicate files are detected. All results 
                are automatically stored in the database for future reference and comparison.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                Charts Module
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                The Charts module enables comparative visualization of multiple gene expression 
                datasets. Researchers can select any number of previously analyzed datasets and 
                generate side-by-side comparisons of mean expression values.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                The visualization engine uses modern charting libraries to create interactive, 
                responsive visualizations that adapt to different screen sizes. Charts are rendered 
                client-side for optimal performance, and the interface provides intuitive controls 
                for dataset selection through checkboxes.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                This comparative capability is essential for identifying patterns across experiments, 
                validating hypotheses, and discovering relationships between different experimental 
                conditions or time points. The visual representation makes it easier to spot 
                significant differences and trends that might not be apparent in raw numerical data.
              </p>
            </div>

            <div style={{
              padding: "24px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "8px"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                History Module
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                The History module provides comprehensive access to all previously analyzed datasets. 
                It serves as a complete audit trail and research record, displaying all analysis 
                results with full metadata and timestamps.
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
                Each history entry displays the original filename, computed statistics (gene count, 
                sample count, mean expression), analysis timestamp, and unique identifier. The 
                interface is designed for easy browsing and searching, with entries displayed in 
                reverse chronological order (most recent first).
              </p>
              <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
                The History module is essential for research reproducibility, allowing researchers 
                to track their computational work, review past analyses, and maintain organized 
                records of their research activities. It also enables quick access to previously 
                analyzed datasets for use in comparative visualizations.
              </p>
            </div>
          </div>
        </div>

        <div className="scifi-card" style={{
          padding: "30px"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            Technical Architecture & Implementation
          </h2>
          <p className="info-text" style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
            The system is built on modern web technologies and follows best practices for scalability, 
            reliability, and maintainability:
          </p>
          
          <div style={{
            padding: "24px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#c4b5fd",
              marginBottom: "16px"
            }}>
              Frontend Architecture
            </h3>
            <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
              The user interface is built using Next.js 16 with React 19, providing server-side 
              rendering capabilities and optimal performance. TypeScript ensures type safety and 
              reduces runtime errors. The UI uses modern CSS with Tailwind CSS for responsive, 
              accessible design that works across different devices and screen sizes.
            </p>
            <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
              Client-side state management handles user interactions, form submissions, and dynamic 
              content updates. The interface provides real-time feedback during file uploads and 
              analysis operations, ensuring users are always informed about system status.
            </p>
          </div>

          <div style={{
            padding: "24px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#c4b5fd",
              marginBottom: "16px"
            }}>
              Backend Architecture
            </h3>
            <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
              The backend uses Next.js API routes for request handling, providing a unified framework 
              for both frontend and backend code. File processing uses streaming techniques to handle 
              large files efficiently without overwhelming server memory.
            </p>
            <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
              Cryptographic hashing is performed using industry-standard algorithms (SHA-256), 
              ensuring reliable duplicate detection. Database operations use an ORM (Object-Relational 
              Mapping) framework that provides type safety, query optimization, and database 
              abstraction, supporting both SQLite for development and PostgreSQL for production.
            </p>
          </div>

          <div style={{
            padding: "24px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px"
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#c4b5fd",
              marginBottom: "16px"
            }}>
              Data Persistence & Scalability
            </h3>
            <p className="info-text" style={{ lineHeight: "1.8", marginBottom: "12px", fontSize: "15px" }}>
              The system uses a relational database with indexed fields for optimal query performance. 
              The file hash field is uniquely indexed, enabling O(log n) lookup times for duplicate 
              detection even with thousands of records. Database migrations ensure schema consistency 
              and enable version-controlled database evolution.
            </p>
            <p className="info-text" style={{ lineHeight: "1.8", fontSize: "15px" }}>
              The architecture is designed to scale horizontally, with database connections managed 
              efficiently and query optimization built into the ORM layer. The system can handle 
              concurrent requests from multiple users while maintaining data integrity through 
              transaction management.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
